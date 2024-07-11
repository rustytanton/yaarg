'use server'

import { auth } from "@/app/auth";
import { ResumeFormDeleteState } from "./types";
import { deleteResume, userOwnsResume } from "@/app/_data/resume";
import { revalidatePath } from "next/cache";

export async function handleFormChange(prevState: ResumeFormDeleteState, formData: FormData) {
    const session = await auth()
    if (session && session.user) {
        const resumeId = Number(formData.get('resumeId'))
        if (await userOwnsResume(resumeId, session.user.id as string)) {
            await deleteResume(resumeId)
            revalidatePath('/resumes')
            return {
                ...prevState,
                message: `Resume ${resumeId} deleted`
            }
        } else {
            return {
                ...prevState,
                message: `Resume ${resumeId} not found for user`
            }
        }
    } else {
        return {
            ...prevState,
            message: `You must be logged in to delete this resume`
        }
    }
}