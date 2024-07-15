import { Job } from "@/app/_data/job"

type Props = {
    job: Job
}

export default function ResumePrintJob({ job }: Props) {
    return (
        <div className="mb-5 pl-5">
            <h3 className="text-xl">{job.employer}</h3>
            <div className="text-sm">
                {job.location} ({job.attendanceModel})&nbsp;|&nbsp;
                {job.startDate}&nbsp;-&nbsp;
                {job.stillWorksHere ? 'current' : job.endDate}
            </div>
            <ul className="list-disc pl-5">
                {job.experiences?.map((experience, experienceIndex) => {
                    return (
                        <li key={experienceIndex}>{experience.content}</li>
                    )
                })}
            </ul>
        </div>
    )
}