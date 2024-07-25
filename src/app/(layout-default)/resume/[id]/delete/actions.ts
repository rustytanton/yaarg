'use server'

import { auth } from "@/app/auth";
import { ResumeFormDeleteState } from "./types";
import { ResumeService } from "@/app/_data/resume";
import { revalidatePath } from "next/cache";

export async function handleFormChange(prevState: ResumeFormDeleteState, formData: FormData) {
    const session = await auth()
    if (session && session.user) {
        const resumeId = Number(formData.get('resumeId'))
        const resumeService = new ResumeService()
        if (await resumeService.userOwnsItem(session.user.id as string, resumeId)) {
            await resumeService.delete(resumeId)
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