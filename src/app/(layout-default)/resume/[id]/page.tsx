'use server'

import { auth } from "@/app/auth"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"
import { Resume, ResumeService } from "@/app/_data/resume"
import ResumeForm from "./form"

export default async function ResumePage({ params }:{ params: { id: string } }) {
    const session = await auth()
    const resumeService = new ResumeService()
    const resume = await resumeService.get(Number(params.id)) as Resume
    const resumeCount = await resumeService.userResumeCount(session?.user?.id as string)

    if (session?.user?.id !== resume?.userId) {
        return (
            <NoAccessMessage message="Must be logged in as the correct user to view this page" />
        )
    }
    
    return (
        <div className="w-3/4">
            <ResumeForm resume={resume} resumeCount={resumeCount} />
        </div>
    )
}