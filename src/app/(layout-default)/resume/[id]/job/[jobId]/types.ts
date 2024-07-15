import { ResumeJobExperiences } from "@/app/_data/resume-job-experience"

export type ResumeJobFormState = {
    addExperience?: boolean
    experiences?: ResumeJobExperiences
    message?: string
    resumeId: number
    jobId: number
}