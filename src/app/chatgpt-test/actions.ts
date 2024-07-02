'use server'

import { getKeywords } from "../chatgpt/assistant-keywords-extractor"
import { ChatGptKeywordFormState } from './types'


export async function handleKeywordsFormChange(prevState: ChatGptKeywordFormState, formData: FormData): Promise<ChatGptKeywordFormState> {
    const prompt = formData.get('prompt') as string
    const keywords = await getKeywords(prompt)
    return {
        ...prevState,
        result: {
            keywords: keywords
        }
    }
}