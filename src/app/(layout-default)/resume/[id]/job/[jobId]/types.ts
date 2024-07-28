import { ResumeJobExperience } from "@/app/_data/resume-job-experience"

export enum ResumeJobFormStatuses {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type ResumeJobFormState = {
    addExperience?: boolean
    experiences?: ResumeJobExperience[]
    message?: string
    resumeId: number
    jobId: number
    status?: ResumeJobFormStatuses
    statusUpdated?: Date
}