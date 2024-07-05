'use server'

import prisma from "@/app/db"

export async function getResumeById(id: number) {
    return await prisma.resume.findFirst({
        where: {
            id: Number(id)
        }
    })
}