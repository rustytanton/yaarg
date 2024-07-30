'use server';

import { auth } from '@/app/auth'
import JobForm from './form'
import { Job, JobService } from '../../_data/job'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';
import Heading2 from '@/app/_lib/components/headings/Heading2';
import PageFooter from '@/app/_lib/components/PageFooter';

export default async function JobsPage() {
    const session = await auth()
    if (session?.user?.id) {
        const jobService = new JobService()
        const jobs = await jobService.getAllByUserId(session.user.id) as Job[]
        return (
            <>
                <Heading2>Jobs</Heading2>
                <JobForm jobs={jobs} />
                <PageFooter />
            </>
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
