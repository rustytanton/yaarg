'use server';

import { auth } from '@/app/auth'
import JobForm from './form'
import { getJobs } from './actions';

export default async function EducationPage() {
    const session = await auth()

    if (session && session.user) {
        const jobs = await getJobs()
        return (
            <JobForm jobs={jobs} />
        )
    } else {
        return (
            <div className="p-10">Please login to see this page</div>
        )
    }
}
