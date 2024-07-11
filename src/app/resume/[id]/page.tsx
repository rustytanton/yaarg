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
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"
import { getResume } from "@/app/_data/resume"
import { ResumeJobExperienceDTOs } from "@/app/_data/resume-job-experience"

export default async function ResumePage({ params }:{ params: { id: string } }) {
    const session = await auth()
    const resume = await getResume(Number(params.id))

    if (session?.user?.id !== resume?.userId) {
        return (
            <NoAccessMessage message="Must be logged in as the correct user to view this page" />
        )
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
                        {resume.jobDescription?.text}
                    </div>
                </ShowHideText>
            </BodySection>
            
            <BodySection>
                <Heading3>Skills Mentioned in Job Description</Heading3>
                <ShowHideText isHidden={true}>
                    <FormSkillsList skills={resume?.jobDescription?.skills} />
                </ShowHideText>
            </BodySection>

            <BodySection>
                <Heading3>Work Experience</Heading3>
                <ListUnordered>
                {resume?.jobs?.map((job, index) => {
                    let jobExperiences: ResumeJobExperienceDTOs = job.experiences || []
                    let resumeId: number = resume.id || 0
                    return (
                        <ListUnorderedItem key={index}>
                            <strong>{job.employer}</strong> | {job.title} | {job.startDate} - {job.endDate} | {job.location} | <Link href={ "/resume/" + resumeId + "/job/" + job.id }>
                                Edit
                            </Link>
                            {((jobExperiences.length) > 0) ?
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