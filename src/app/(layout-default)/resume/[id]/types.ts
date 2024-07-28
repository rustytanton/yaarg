import { Resume } from "@/app/_data/resume"

export enum ResumeFormStatuses {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type ResumeFormState = {
    resume: Resume
    message: string
    loadSuggestions: boolean
    status?: ResumeFormStatuses
    statusUpdated?: Date
}

export enum ResumeSubmitTypes {
    CHATGPT_ASYNC_JOB = "chatGptAsyncJob",
    CHATGPT_SUGGESTIONS = "chatGptSuggestions",
    POPULATE_PAST_EXPERIENCES = "pastExperience"
}