'use server'

import { auth } from '@/app/auth'
import { JobFormState } from './types'
import { deleteIds, fieldGroups } from '@/app/_lib/util/form'
import { revalidatePath } from 'next/cache'
import { parseMMYYYY } from '@/app/_lib/util/dates'
import { Job, JobService } from '../../_data/job'

export async function handleFormChange(prevState: JobFormState, formData: FormData): Promise<JobFormState> {
    const session = await auth()
    const jobService = new JobService()
    if (session?.user?.id) {
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
                if (await jobService.userOwnsItem(session.user.id, id)) {
                    await jobService.delete(id)
                    messages.push(`Deleted job ${id}.`) 
                } else {
                    throw new Error('User does not own this job')
                }
            }

            for (const group of groups) {
                let job: Job = {
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
                if (job.id && await jobService.userOwnsItem(session.user.id, job.id)) {
                    await jobService.update(job)
                    messages.push(`Updated ${job.id}.`)
                } else {
                    job = await jobService.create(job) as Job
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