import { Resume } from "@/app/_data/resume"

export type ResumeFormState = {
    resume?: Resume
    message: string
    loadSuggestions: boolean
}

export enum ResumeSubmitTypes {
    CHATGPT_SUGGESTIONS = "chatGptSuggestions",
    POPULATE_PAST_EXPERIENCES = "pastExperience"
}