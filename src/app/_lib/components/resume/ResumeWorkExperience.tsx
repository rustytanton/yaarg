import Link from "next/link"
import ResumeSubheading from "./ResumeSubheading"
import { JobDTOs } from "@/app/_data/job"
import ResumeWorkExperienceItems from "./ResumeWorkExperienceItems"
import { ResumeJobExperienceDTOs } from "@/app/_data/resume-job-experience"
import ResumeHeading3 from "./ResumeHeading3"
import BodySection from "../BodySection"

type Props = {
    jobs: JobDTOs,
    resumeId: number
}

export default function ResumeWorkExperience({ jobs, resumeId }: Props) {
    return (
        <BodySection>
            <ResumeSubheading>Work Experience</ResumeSubheading>
                {jobs.map((job, jobIndex) => {
                    return <div className="mb-5 pl-5" key={jobIndex}>
                        <div className="flex items-center">
                            <ResumeHeading3>{job.employer}</ResumeHeading3>&nbsp;|&nbsp;
                            <Link className="text-sm" href={ '/resume/' + resumeId + '/job/' + job.id  }>Edit</Link>
                        </div>
                        <div className="text-sm">
                            {job.location} | {job.startDate} - {job.stillWorksHere ? 'present' : job.endDate}
                        </div>
                        <ResumeWorkExperienceItems experiences={job.experiences as ResumeJobExperienceDTOs} />
                    </div>
                })}
        </BodySection>        
    )
}