'use server'

import { auth } from "@/app/auth"
import FormSkillsList from "@/app/components/FormSkillsList"
import ShowHideText from "@/app/components/ShowHideText"
import prisma from "@/app/db"


export default async function ResumePage({ params }:{ params: { id: string } }) {
    const session = await auth()

    const resume = await prisma.resume.findFirst({
        where: {
            id: Number(params.id)
        }
    })

    if (!session || !session.user || session.user.id !== resume?.userId) {
        return (
            <div>Must be logged in as the correct user to view this page</div>
        )
    }

    const skills = await prisma.jobDescriptionSkill.findMany({
        where: {
            jobDescriptionId: resume?.jobDescriptionId
        }
    })

    const jobDescription = await prisma.jobDescription.findFirst({
        where: {
            id: resume?.jobDescriptionId
        }
    })

    const jobs = await prisma.job.findMany({
        where: {
            userId: session.user.id
        }
    })

    return (
        <div className="w-3/4">
            <h2>Resume {params.id}</h2>
            <p>Employer: {resume?.employer}</p>
            
            <h3>Job Description</h3>
            <ShowHideText isHidden={true}>
                <div className="whitespace-pre-wrap p-10">
                    {jobDescription?.text}
                </div>
            </ShowHideText>

            <h3>Skills Mentioned in Job Description:</h3>
            <FormSkillsList skills={skills} />
        </div>
    )
}