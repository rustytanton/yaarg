import { ResumeJobExperience } from "@/app/_data/resume-job-experience"

export type ResumeJobFormState = {
    addExperience?: boolean
    experiences?: ResumeJobExperience[]
    message?: string
    resumeId: number
    jobId: number
}