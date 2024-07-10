'use server'

import prisma from "@/app/db"

export async function getJobsByUserId(userId: string) {
    return await prisma.job.findMany({
        where: {
            userId: userId
        }
    })
}

export async function getJobById(jobId: number) {
    return await prisma.job.findFirst({
        where: {
            id: jobId
        }
    })
}