'use server'

import prisma from "@/app/db"

export async function getJobsByUserId(userId: string) {
    return await prisma.job.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            startDateParsed: 'desc'
        }
    })
}