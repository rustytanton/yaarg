'use server'

import BodyHeader from "@/app/_lib/components/BodyHeading"
import BodySection from "@/app/_lib/components/BodySection"
import FormSkillsList from "@/app/_lib/components/FormSkillsList"
import Heading2 from "@/app/_lib/components/Heading2"
import Heading3 from "@/app/_lib/components/Heading3"
import ShowHideText from "@/app/_lib/components/ShowHideText"
// import { getJobDescriptionSkillsByJobDescriptionId } from "@/app/_lib/job-description-skill/crud"
// import { getJobById } from "@/app/_lib/job/crud"
// import { getResumeById } from "@/app/_lib/resume/crud"
import Link from "next/link"
import FormResumeJob from "./form"
// import { getExperiences } from "@/app/_lib/resume-job-experience/crud"
import { auth } from "@/app/auth"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"
import { getResume } from "@/app/_data/resume"
import { ResumeJobExperienceDTOs } from "@/app/_data/resume-job-experience"
import Heading1 from "@/app/_lib/components/headings/Heading1"

export default async function ResumeJobPage({ params }:{ params: { id: string, jobId: string } }) {

    const session = await auth()
    if (session) {
        const resume = await getResume(Number(params.id))
        const job = resume?.jobs?.filter(job => {
            return job.id === Number(params.jobId)
        })[0]

        if (resume?.userId !== session.user?.id) {
            return (
                <NoAccessMessage message="Must be logged in as the correct user to view this job/resume" />
            )
        }

        return (
            <div className="w-3/4">
                <BodyHeader>
                    <Heading1>Resume - {resume.employer}</Heading1>
                    <div className="mt-5 mb-2">Editing experience for job <strong>{job?.employer}</strong></div>
                    <Link href={ "/resume/" + params.id }>Back to Resume</Link>
                </BodyHeader>
    
                <BodySection>
                    <Heading3>Skills Mentioned in Job Description</Heading3>
                    <FormSkillsList skills={resume?.jobDescription?.skills} />
                </BodySection>
    
                <BodySection>
                    <FormResumeJob jobExperiences={job?.experiences as ResumeJobExperienceDTOs} resumeId={Number(params.id)} jobId={Number(params.jobId)} />
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