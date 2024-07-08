'use server'

import BodyHeader from "@/app/_lib/components/BodyHeading"
import BodySection from "@/app/_lib/components/BodySection"
import FormSkillsList from "@/app/_lib/components/FormSkillsList"
import Heading2 from "@/app/_lib/components/Heading2"
import Heading3 from "@/app/_lib/components/Heading3"
import ShowHideText from "@/app/_lib/components/ShowHideText"
import { getJobDescriptionSkillsByJobDescriptionId } from "@/app/_lib/job-description-skill/crud"
import { getJobById } from "@/app/_lib/job/crud"
import { getResumeById } from "@/app/_lib/resume/crud"
import Link from "next/link"
import FormResumeJob from "./form"
import { getExperiences } from "@/app/_lib/resume-job-experience/crud"
import { auth } from "@/app/auth"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"

export default async function ResumeJobPage({ params }:{ params: { id: string, jobId: string } }) {

    const session = await auth()
    if (session) {
        const resume = await getResumeById(Number(params.id))
        const job = await getJobById(Number(params.jobId))
        const skills = await getJobDescriptionSkillsByJobDescriptionId(Number(resume?.jobDescriptionId))
        const experiences = await getExperiences(Number(params.id), Number(params.jobId))

        if (resume?.userId !== session.user?.id) {
            return (
                <NoAccessMessage message="Must be logged in as the correct user to view this job/resume" />
            )
        }

        return (
            <div className="w-3/4">
                <BodyHeader>
                    <Heading2>Resume {params.id}</Heading2>
                    <Heading3>Job</Heading3>
                    <div>{job?.employer} | {job?.startDate} - {job?.endDate}</div>
                </BodyHeader>
    
                <BodySection>
                    <Heading3>Skills Mentioned in Job Description</Heading3>
                    <ShowHideText isHidden={true}>
                        <FormSkillsList skills={skills} />
                    </ShowHideText>
                </BodySection>
    
                <BodySection>
                    <FormResumeJob jobExperiences={experiences} resumeId={Number(params.id)} jobId={Number(params.jobId)} />
                </BodySection>
    
                <BodySection>
                    <Link href={ "/resume/" + params.id }>Back to Resume</Link>
                </BodySection>
            </div>
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}