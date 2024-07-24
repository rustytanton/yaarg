'use server';

import { auth } from '@/app/auth'
import JobForm from './form'
import { Job, JobService } from '../../_data/job'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function JobsPage() {
    const session = await auth()
    if (session?.user?.id) {
        const jobService = new JobService()
        const jobs = await jobService.getAllByUserId(session.user.id) as Job[]
        return (
            <JobForm jobs={jobs} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
