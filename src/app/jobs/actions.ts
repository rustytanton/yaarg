'use server'

import { auth } from '@/app/auth'
import { JobFormState } from './types'
import { deleteIds, fieldGroups } from '@/app/_lib/util/form'
import { revalidatePath } from 'next/cache'
import { parseMMYYYY } from '@/app/_lib/util/dates'
import { JobDTO, JobDTOs, createJob, deleteJob, updateJob, userOwnsJob } from '../_data/job'

export async function handleFormChange(prevState: JobFormState, formData: FormData): Promise<JobFormState> {
    const session = await auth()
    if (session?.user?.id) {
        if (prevState.addSection) {
            return {
                addSection: false,
                jobs: prevState.jobs.concat([{} as JobDTO]),
                message: 'Added new job section'
            }
        } else {
            let jobs: JobDTOs = []
            let messages: string[] = []
            let deletes = deleteIds(formData)
            let groups = fieldGroups(formData, 'job')

            for (const id of deletes) {
                if (await userOwnsJob(session.user.id, id)) {
                    await deleteJob(id)
                    messages.push(`Deleted job ${id}.`) 
                } else {
                    throw new Error('User does not own this job')
                }
            }

            for (const group of groups) {
                let job: JobDTO = {
                    userId: session.user.id as string,
                    id: Number(formData.get(group + 'id')) || 0,
                    employer: formData.get(group + 'employer') as string,
                    title: formData.get(group + 'title') as string,
                    location: formData.get(group + 'location') as string,
                    startDate: formData.get(group + 'startDate') as string,
                    startDateParsed: parseMMYYYY(formData.get(group + 'startDate') as string),
                    endDate: formData.get(group + 'endDate') as string,
                    endDateParsed: parseMMYYYY(formData.get(group + 'endDate') as string),
                    attendanceModel: formData.get(group + 'attendanceModel') as string,
                    stillWorksHere: (formData.get(group + 'stillWorksHere') === 'on') ? true : false,
                }
                if (job.id && await userOwnsJob(session.user.id, job.id)) {
                    await updateJob(job)
                    messages.push(`Updated ${job.id}.`)
                } else {
                    job = await createJob(job)
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