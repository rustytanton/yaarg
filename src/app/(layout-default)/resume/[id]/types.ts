import { Resume } from "@/app/_data/resume"

export type ResumeFormState = {
    resume?: Resume
    message: string
    loadSuggestions: boolean
}