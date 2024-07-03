import { MessageContent } from "openai/resources/beta/threads/messages.mjs";
import { assistant, assistantProperties, assistantMessage } from "./assistant";

export const assistantKeywordExtractor: assistantProperties = {
    name: 'YAARG keywords extractor',
    instructions: `
Parse the provided job description, finding the skills mentioned and how many times each skill is mentioned.
Return results in a JSON object which looks like this:
{
    "skills": [
        {
            "skill": string,
            "mentioned": number
        }
    ]
}`,
    model: 'gpt-3.5-turbo'
}

export type ChatGptKeyword = {
    skill: string
    mentioned: number
}

type KeywordsMessageContent = MessageContent & {
    text: {
        value: string
    }
}

export async function getKeywords(prompt: string) {
    const _assistant = await assistant(assistantKeywordExtractor)
    if (_assistant) {
        const messages = await assistantMessage(_assistant.externalId, prompt)
        if (messages) {
            const result = messages.data[0].content[0] as KeywordsMessageContent
            return JSON.parse(result.text.value)
        }
    }
}