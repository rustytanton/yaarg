'use server'

import FormSkillsList from "@/app/components/FormSkillsList"
import prisma from "@/app/db"

export default async function ResumePage({ params }:{ params: { id: string } }) {
    const resume = await prisma.resume.findFirst({
        where: {
            id: Number(params.id)
        }
    })

    const skills = await prisma.jobDescriptionSkill.findMany({
        where: {
            jobDescriptionId: resume?.jobDescriptionId
        }
    })

    return (
        <div>
            <p>editing resume {params.id}</p>
            <FormSkillsList skills={skills} />
        </div>
    )
}