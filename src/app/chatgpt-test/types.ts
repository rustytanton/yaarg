import { ChatGptKeyword } from "../chatgpt/assistant-keywords-extractor"

export type ChatGptKeywordFormState = {
    prompt: string
    result: {
        keywords: {
            skills: Array<ChatGptKeyword>
        }
    }
}
