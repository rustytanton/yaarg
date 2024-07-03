import { ChatGptSkill } from "@/app/chatgpt/assistant-skills-extractor"

export type ChatGptKeywordFormState = {
    prompt: string
    result: {
        keywords: {
            skills: Array<ChatGptSkill>
        }
    }
}
