'use server';

import { auth } from '@/app/auth'
import JobForm from './form'
import { getJobs } from '../../_data/job'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function JobsPage() {
    const session = await auth()
    if (session?.user?.id) {
        const jobs = await getJobs(session.user.id)
        return (
            <JobForm jobs={jobs} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
