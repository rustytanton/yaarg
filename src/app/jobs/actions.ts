'use server'

import prisma from '@/app/db'
import { auth } from '@/app/auth'
import { Job } from '@prisma/client'
import { JobFormState } from './types'
import { deleteIds, fieldGroups } from '@/app/_lib/util/form'
import { revalidatePath } from 'next/cache'
import { parseMMYYYY } from '@/app/_lib/util/dates'

export async function getJobs(): Promise<Job[]> {
    const session = await auth()

    if (session && session.user) {
        const jobs = await prisma.job.findMany()
        return jobs || []
    } else {
        return []
    }
}

export async function handleFormChange(prevState: JobFormState, formData: FormData): Promise<JobFormState> {
    const session = await auth()
    if (session && session.user) {
        if (prevState.addSection) {
            return {
                addSection: false,
                jobs: prevState.jobs.concat([{} as Job]),
                message: 'Added new job section'
            }
        } else {
            let jobs: Job[] = []
            let messages: string[] = []
            let deletes = deleteIds(formData)
            let groups = fieldGroups(formData, 'job')

            for (const id of deletes) {
                await prisma.job.delete({
                    where: { id: id }
                })
                messages.push(`Deleted job ${id}.`) 
            }

            for (const group of groups) {
                let payload = {
                    userId: session.user.id as string,
                    id: Number(formData.get(group + 'id')) || undefined,
                    employer: formData.get(group + 'employer') as string,
                    title: formData.get(group + 'title') as string,
                    location: formData.get(group + 'location') as string,
                    startDate: formData.get(group + 'startDate') as string,
                    startDateParsed: parseMMYYYY(formData.get(group + 'startDate') as string),
                    endDate: formData.get(group + 'endDate') as string,
                    attendanceModel: formData.get(group + 'attendanceModel') as string,
                    stillWorksHere: (formData.get(group + 'stillWorksHere') === 'on') ? true : false,
                }
                
                let job: Job

                if (payload.id) {
                    job = await prisma.job.update({
                        where: { id: payload.id },
                        data: { ...payload }
                    })
                    messages.push(`Updated ${job.id}.`)
                } else {
                    job = await prisma.job.create({
                        data: payload
                    })
                    messages.push(`Created ${job.id}.`)
                }

                jobs.push(job)
            }

            revalidatePath('/jobs')

            return {
                ...prevState,
                jobs: jobs,
                message: messages.join(' ')
            }
        }
    }
    return prevState
}