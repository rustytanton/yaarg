'use server';

import { auth } from '@/app/auth'
import JobForm from './form'
import { getJobs } from './actions';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function EducationPage() {
    const session = await auth()
    if (session) {
        const jobs = await getJobs()
        return (
            <JobForm jobs={jobs} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
