'use server'

import BodyHeader from "@/app/_lib/components/body/BodyHeading"
import BodySection from "@/app/_lib/components/body/BodySection"
import FormSkillsList from "@/app/_lib/components/form/FormSkillsList"
import Heading3 from "@/app/_lib/components/headings/Heading3"
import Link from "next/link"
import FormResumeJob from "./form"
import { auth } from "@/app/auth"
import NoAccessMessage from "@/app/_lib/components/NoAccessMessage"
import { getResume } from "@/app/_data/resume"
import { ResumeJobExperience } from "@/app/_data/resume-job-experience"
import Heading1 from "@/app/_lib/components/headings/Heading1"
import { Job } from "@/app/_data/job"

export default async function ResumeJobPage({ params }:{ params: { id: string, jobId: string } }) {

    const session = await auth()
    if (session) {
        const resume = await getResume(Number(params.id))
        const job = resume?.jobs?.filter((job: { id: number }) => {
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
                    <Link href={ "/resume/" + params.id }>Back to Resume</Link>
                </BodyHeader>
    
                <BodySection>
                    <FormResumeJob
                        jobExperiences={job?.experiences as ResumeJobExperience[]}
                        resumeId={Number(params.id)}
                        job={job as Job}
                    />
                </BodySection>

                <BodySection>
                    <Heading3>Skills Mentioned in Job Description</Heading3>
                    <FormSkillsList skills={resume?.jobDescription?.skills} />
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