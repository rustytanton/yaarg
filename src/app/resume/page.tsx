'use server'

import { auth } from "@/app/auth"
import ResumeFormNew from "./form"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"

export default async function ResumePage() {
    const session = await auth()
    if (session) {
        return (
            <ResumeFormNew />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}