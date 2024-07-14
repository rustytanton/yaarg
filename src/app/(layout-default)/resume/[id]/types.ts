import { ResumeDTO } from "@/app/_data/resume"

export type ResumeFormState = {
    resume?: ResumeDTO
    message: string
    loadSuggestions: boolean
}