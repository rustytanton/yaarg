import { ChatGptSkill } from "@/app/_lib/chatgpt/assistant-skills-extractor"

export type ChatGptKeywordFormState = {
    prompt: string
    result: {
        keywords: {
            skills: Array<ChatGptSkill>
        }
    }
}
