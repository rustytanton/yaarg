import { MessageContent } from "openai/resources/beta/threads/messages.mjs";
import { assistant, assistantProperties, assistantMessage } from "./assistant";

export const assistantSuggestions: assistantProperties = {
    name: 'YAARG skills suggestions v1',
    instructions: `
You will be prompted with a JSON object with the following structure:
{
    "skills": string[]
    "bullets": [
        {
            "bulletText": string,
            "bulletId": number
        }
    ]
}

Each item in the "bullets" array is a bullet point which describes an accomplishment to be included in the experience section of a resume. Bullet text should follow STAR format (Situation Task Action Result) and use strong action verbs when possible. Bullet text should include specific success metrics when possible. Bullet text should avoid repetitive language. Bullet text should be gramatically correct and include no misspelled words.

For each item in the "bullets" array:
1. Determine all relevant skills from the "skills" array which are and are not mentioned
2. Analyze the text and offer suggestions to improve the writing quality

Then return a JSON object with this structure:
{
    "result": [
        {
            "bulletText": string,
            "bulletId": number,
            "skillsUsed": string[],
            "skillsNotUsed": string[],
            "qualitySuggestions": string[]
        }
    ]
}`,
    model: 'gpt-3.5-turbo'
}

export type ChatGptSuggestionsrPromptBullet = {
    bulletId: number
    bulletText: string
}

export type ChatGptSuggestionsrPrompt = {
    keywords: string[],
    bullets: ChatGptSuggestionsrPromptBullet[]
}

type SuggestionsMessageContent = MessageContent & {
    text: {
        value: string
    }
}

export type ChatGptSuggestionsResultItem = {
    bulletText: string,
    bulletId: number,
    skillsUsed: string[],
    skillsNotUsed: string[],
    qualitySuggestions: string
}

export type ChatGptSuggestionsResult = {
    result: ChatGptSuggestionsResultItem[]
}

export async function getBulletAnalysis(prompt: string): Promise<ChatGptSuggestionsResultItem[]> {
    const _assistant = await assistant(assistantSuggestions)
    if (_assistant) {
        const messages = await assistantMessage(_assistant.externalId, prompt)
        if (messages) {
            const result = messages.data[0].content[0] as SuggestionsMessageContent
            const json = JSON.parse(result.text.value) as ChatGptSuggestionsResult
            return json.result
        }
    }
    return []
}