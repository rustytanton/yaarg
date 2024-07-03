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
        <div className="w-3/4">
            <p>Editing resume {params.id}</p>
            <p>Employer: {resume?.employer}</p>
            <h2>Skills Mentioned in Job Description:</h2>
            <FormSkillsList skills={skills} />
        </div>
    )
}