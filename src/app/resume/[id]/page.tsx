'use server'

import { auth } from "@/app/auth"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"
import { getResume } from "@/app/_data/resume"
import ResumeForm from "./form"

export default async function ResumePage({ params }:{ params: { id: string } }) {
    const session = await auth()
    const resume = await getResume(Number(params.id))

    if (session?.user?.id !== resume?.userId) {
        return (
            <NoAccessMessage message="Must be logged in as the correct user to view this page" />
        )
    }

    return (
        <div className="w-3/4">
            <ResumeForm resume={resume} />
        </div>
    )
}