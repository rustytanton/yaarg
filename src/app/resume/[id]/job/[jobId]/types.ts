import { ResumeJobExperience } from "@prisma/client"

export type ResumeJobFormState = {
    addExperience?: boolean
    experiences?: ResumeJobExperience[]
    message?: string
    resumeId: number
    jobId: number
}