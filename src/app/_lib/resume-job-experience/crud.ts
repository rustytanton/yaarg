'use server'

import prisma from "@/app/db"

export async function getExperiences(resumeId: number, jobId: number) {
    return await prisma.resumeJobExperience.findMany({
        where: {
            jobId: jobId,
            resumeId: resumeId
        }
    })
}