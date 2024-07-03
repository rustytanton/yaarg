'use server'

import { auth } from "@/app/auth";
import { ResumeFormDeleteState } from "./types";
import prisma from "@/app/db";

export async function handleFormChange(prevState: ResumeFormDeleteState, formData: FormData) {
    const session = await auth()
    if (session && session.user) {
        const resumeId = Number(formData.get('resumeId'))
        const resume = await prisma.resume.findFirst({
            where: {
                id: resumeId
            }
        })
        if (resume && resume.userId === session.user.id) {
            await prisma.resume.delete({
                where: {
                    id: resumeId
                }
            })
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