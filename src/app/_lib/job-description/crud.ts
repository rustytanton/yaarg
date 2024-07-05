import prisma from "@/app/db";

export async function getJobDescriptionById(id: number) {
    return await prisma.jobDescription.findFirst({
        where: {
            id: id
        }
    })
}

