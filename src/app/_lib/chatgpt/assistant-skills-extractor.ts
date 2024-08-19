import { MessageContent } from "openai/resources/beta/threads/messages.mjs";
import { assistant, assistantProperties, assistantMessage } from "./assistant";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const ResponseFormat = z.object({
    "skills": z.array(z.object({
        "skill": z.string(),
        "mentions": z.number()
    }))
})

export const assistantSkillsExtractor: assistantProperties = {
    name: 'YAARG skills extractor v3',
    instructions: `
Parse the provided job description, finding the skills mentioned and how many times each skill is mentioned.
Return results in a JSON object which looks like this:
{
    "skills": [
        {
            "skill": string,
            "mentions": number
        }
    ]
}
The JSON object should be sorted in descending order from most mentions to fewest mentions.`,
    model: 'gpt-3.5-turbo-1106',
    // responseFormat: zodResponseFormat(ResponseFormat, "skillsExtractor")
    responseFormat: { "type": "json_object" }
}

export type ChatGptSkill = {
    skill: string
    mentions: number
}

type SkillsMessageContent = MessageContent & {
    text: {
        value: string
    }
}

type SkillsResultValue = {
    skills: Array<ChatGptSkill>
}

export async function getSkills(prompt: string): Promise<Array<ChatGptSkill>> {
    const _assistant = await assistant(assistantSkillsExtractor)
    if (_assistant) {
        const messages = await assistantMessage(_assistant.externalId, prompt)
        if (messages) {
            const result = messages.data[0].content[0] as SkillsMessageContent
            const json = JSON.parse(result.text.value) as SkillsResultValue
            return json.skills
        }
    }
    return []
}