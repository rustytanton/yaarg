'use server'

import Link from "next/link"

export default async function ResumeJobPage({ params }:{ params: { id: string, jobId: string } }) {
    return (
        <>
            <div>Resume {params.id}</div>
            <div>Job {params.jobId}</div>
            <Link href={ "/resume/" + params.id }>Back to Resume</Link>
        </>
    )
}