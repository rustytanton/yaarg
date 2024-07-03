'use server'

import { getSkills } from "../chatgpt/assistant-skills-extractor"
import { ChatGptKeywordFormState } from './types'


export async function handleKeywordsFormChange(prevState: ChatGptKeywordFormState, formData: FormData): Promise<ChatGptKeywordFormState> {
    const prompt = formData.get('prompt') as string
    const skills = await getSkills(prompt)
    return {
        ...prevState,
        result: {
            keywords: {
                skills: skills
            }
        }
    }
}