'use server'

import { auth } from "@/app/auth"
import BodyHeader from "@/app/_lib/components/BodyHeading"
import BodySection from "@/app/_lib/components/BodySection"
import FormSkillsList from "@/app/_lib/components/FormSkillsList"
import Heading2 from "@/app/_lib/components/Heading2"
import Heading3 from "@/app/_lib/components/Heading3"
import ListUnordered from "@/app/_lib/components/ListUnordered"
import ListUnorderedItem from "@/app/_lib/components/ListUnorderedItem"
import ShowHideText from "@/app/_lib/components/ShowHideText"
import prisma from "@/app/db"
import Link from "next/link"


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
        },
        orderBy: {
            endDate: 'desc'
        }
    })

    return (
        <div className="w-3/4">
            <BodyHeader>
                <Heading2>Resume {params.id}</Heading2>
                <p>Employer: {resume?.employer}</p>
            </BodyHeader>

            <BodySection>
                <Heading3>Job Description</Heading3>
                <ShowHideText isHidden={true}>
                    <div className="whitespace-pre-wrap p-10">
                        {jobDescription?.text}
                    </div>
                </ShowHideText>
            </BodySection>
            
            <BodySection>
                <Heading3>Skills Mentioned in Job Description:</Heading3>
                <FormSkillsList skills={skills} />
            </BodySection>

            <BodySection>
                <Heading3>Enter experience for your jobs:</Heading3>
                <ListUnordered>
                {jobs.map((job, index) => {
                    return (
                        <ListUnorderedItem key={index}>
                            <Link href={ "/resume/" + resume?.id.toString() + "/job/" + job.id }>
                                {job.employer} {job.startDate} - {job.endDate}
                            </Link>
                        </ListUnorderedItem>
                    )
                })}
                </ListUnordered>
            </BodySection>

        </div>
    )
}