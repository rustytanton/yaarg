import { ResumeJobExperienceDTOs } from "@/app/_data/resume-job-experience"

export type ResumeJobFormState = {
    addExperience?: boolean
    experiences?: ResumeJobExperienceDTOs
    message?: string
    resumeId: number
    jobId: number
}