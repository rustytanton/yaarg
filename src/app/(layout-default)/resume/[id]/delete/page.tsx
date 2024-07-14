'use server'

import { auth } from "@/app/auth"
import ResumeDeleteForm from "./form"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"

export default async function ResumeDeletePage({ params }:{ params: { id: string } }) {
    const session = await auth()
    if (session) {
        return (
            <ResumeDeleteForm id={params.id} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}