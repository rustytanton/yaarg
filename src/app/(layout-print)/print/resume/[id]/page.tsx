'use server'

import { getResume } from '@/app/_data/resume'
import ResumePrintHeader from '@/app/_lib/components/print-resume/ResumePrintHeader'
import ResumePrintSummary from '@/app/_lib/components/print-resume/ResumePrintSummary'
import ResumePrintJob from '@/app/_lib/components/print-resume/ResumePrintJob'
import ResumePrintEducation from '@/app/_lib/components/print-resume/ResumePrintEducation'
import { Key } from 'react'
import { Education } from '@/app/_data/education'

export default async function ResumePrintPage({ params }:{ params: { id: string } }) {
    const resume = await getResume(Number(params.id))

    return (
        <div className="p-10">
            <ResumePrintHeader user={resume.user} />
            <ResumePrintSummary summary={resume.summary} />
            <h2 className="text-2xl mb-5">Work Experience</h2>
            {resume.jobs?.map((job, jobIndex) => {
                return (
                    <ResumePrintJob key={jobIndex} job={job} />
                )
            })}
            <h2 className="text-2xl mb-5">Education</h2>
            {resume.educations?.map((education: Education, educationIndex: number) => {
                return (
                    <ResumePrintEducation key={educationIndex} education={education} />
                )
            })}
        </div>
    )
}