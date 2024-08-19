import { MessageContent } from "openai/resources/beta/threads/messages.mjs";
import { assistant, assistantProperties, assistantMessage, assistantMessageAsync, assistantMessageAsyncResult, chatGptAsyncJobTypes } from "./assistant";
import { ChatGptAsyncJob } from "@/app/_data/chatgpt-async-job";
import { z } from 'zod'
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const ResultFormat = z.object({
    summaryQualitySuggestions: z.array(z.string())
})

export const assistantSuggestionsSummary: assistantProperties = {
    name: 'YAARG summary suggestions v3',
    instructions: `
You will be prompted with a JSON object with the following structure:
{
    "summary": string,
    "skills": string[]
}

The "summary" property is the text of a resume summary or headline. Offer suggestions to improve the summary text writing quality. Summary text should be gramatically correct and include no misspelled words. Summary text should use strong action verbs and mention as many skills from the "skills" array as possible.

Then return a JSON object with this structure:
{
    "summaryQualitySuggestions": string[]
}`,
    model: 'gpt-3.5-turbo-1106',
    // responseFormat: zodResponseFormat(ResultFormat, "summarySuggestions")
    responseFormat: { "type": "json_object" }
}

type SuggestionsSummaryMessageContent = MessageContent & {
    text: {
        value: string
    }
}

export type ChatGptSuggestionsSummaryResult = {
    summaryQualitySuggestions: string[],
    status: string
}

export async function getBulletAnalysis(prompt: string): Promise<ChatGptSuggestionsSummaryResult> {
    const _assistant = await assistant(assistantSuggestionsSummary)
    if (_assistant) {
        const messages = await assistantMessage(_assistant.externalId, prompt)
        if (messages) {
            const result = messages.data[0].content[0] as SuggestionsSummaryMessageContent
            const json = JSON.parse(result.text.value) as ChatGptSuggestionsSummaryResult
            return json
        }
    }
    return {} as ChatGptSuggestionsSummaryResult
}

export async function getSummaryAnalysisAsync(prompt: string, resumeId: number) {
    const _assistant = await assistant(assistantSuggestionsSummary)
    if (_assistant) {
        return await assistantMessageAsync(_assistant, resumeId, prompt, chatGptAsyncJobTypes.SUMMARY_SUGGESTIONS)
    } else {
        throw new Error('No assistant found')
    }
}

export async function getSummaryAnalysisAsyncResult(job: ChatGptAsyncJob) {
    const jobResult = await assistantMessageAsyncResult(job)
    if (jobResult.messages) {
        const result = jobResult.messages.data[0].content[0] as SuggestionsSummaryMessageContent
        const json = JSON.parse(result.text.value) as ChatGptSuggestionsSummaryResult
        json.status = jobResult.status
        return json
    }
    return {
        status: jobResult.status
    } as ChatGptSuggestionsSummaryResult
}