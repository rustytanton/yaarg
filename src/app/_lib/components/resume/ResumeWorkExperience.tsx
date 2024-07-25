import Link from "next/link"
import ResumeSubheading from "./ResumeSubheading"
import { Job } from "@/app/_data/job"
import ResumeWorkExperienceItems from "./ResumeWorkExperienceItems"
import { ResumeJobExperience } from "@/app/_data/resume-job-experience"
import ResumeHeading3 from "./ResumeHeading3"
import BodySection from "@/app/_lib/components/body/BodySection"

type Props = {
    jobs: Job[],
    resumeId: number
}

export default function ResumeWorkExperience({ jobs, resumeId }: Props) {
    return (
        <BodySection>
            <ResumeSubheading>Work Experience</ResumeSubheading>
                {jobs.map((job, jobIndex) => {
                    return <div className="mb-5 pl-5" key={jobIndex}>
                        <div className="flex items-center">
                            <ResumeHeading3>{job.employer}</ResumeHeading3><span className="hidden md:inline">&nbsp;|&nbsp;</span>
                            <Link className="text-sm pl-5 md:pl-0" href={ '/resume/' + resumeId + '/job/' + job.id  }>Edit</Link>
                        </div>
                        <div className="text-sm">
                            {job.location} | {job.startDate} - {job.stillWorksHere ? 'present' : job.endDate}
                        </div>
                        <ResumeWorkExperienceItems experiences={job.experiences as ResumeJobExperience[]} />
                    </div>
                })}
        </BodySection>        
    )
}