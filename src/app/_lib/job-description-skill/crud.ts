'use server'

import prisma from "@/app/db"

export async function getJobDescriptionSkillsByJobDescriptionId (id: number) {
    return await prisma.jobDescriptionSkill.findMany({
        where: {
            jobDescriptionId: id
        }
    })
}