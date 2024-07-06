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
import Link from "next/link"
import { getResumeById } from "@/app/_lib/resume/crud"
import { getJobsByUserId } from "@/app/_lib/job/crud"
import { getJobDescriptionById } from "@/app/_lib/job-description/crud"
import { getJobDescriptionSkillsByJobDescriptionId } from "@/app/_lib/job-description-skill/crud"
import { ResumeJobExperience } from "@prisma/client"
import prisma from "@/app/db"

export default async function ResumePage({ params }:{ params: { id: string } }) {
    const session = await auth()
    const resume = await getResumeById(Number(params.id))

    if (!session || !session.user || session.user.id !== resume?.userId) {
        return (
            <div>Must be logged in as the correct user to view this page</div>
        )
    }

    const skills = await getJobDescriptionSkillsByJobDescriptionId(Number(resume?.jobDescriptionId))
    const jobDescription = await getJobDescriptionById(Number(resume?.jobDescriptionId))
    const jobs = await getJobsByUserId(session.user.id as string)
    let experiences: ResumeJobExperience[] = []

    for (const job of jobs) {
        const jobExperiences = await prisma.resumeJobExperience.findMany({
            where: {
                jobId: job.id
            }
        })
        experiences = experiences.concat(jobExperiences)
    }

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
                <Heading3>Skills Mentioned in Job Description</Heading3>
                <ShowHideText isHidden={true}>
                    <FormSkillsList skills={skills} />
                </ShowHideText>
            </BodySection>

            <BodySection>
                <Heading3>Work Experience</Heading3>
                <ListUnordered>
                {jobs.map((job, index) => {
                    const jobExperiences = experiences.filter((experience) => {
                        return experience.jobId === job.id
                    })
                    return (
                        <ListUnorderedItem key={index}>
                            <strong>{job.employer}</strong> | {job.title} | {job.startDate} - {job.endDate} | {job.location} | <Link href={ "/resume/" + resume?.id.toString() + "/job/" + job.id }>
                                Edit
                            </Link>
                            {(jobExperiences.length > 0) ?
                                <ListUnordered>
                                    {jobExperiences.map((experience, eindex) => {
                                        return (
                                            <ListUnorderedItem key={eindex}>
                                                {experience.content}
                                            </ListUnorderedItem>
                                        )
                                    })}
                                </ListUnordered>
                            : ''}
                        </ListUnorderedItem>
                    )
                })}
                </ListUnordered>
            </BodySection>

        </div>
    )
}