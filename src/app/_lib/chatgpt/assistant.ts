import { ChatGptAssistant, ChatGptAssistantService } from "@/app/_data/chatgpt-assistant";
import { ChatGptAsyncJob, ChatGptAsyncJobService } from "@/app/_data/chatgpt-async-job";
import { ResumeService } from "@/app/_data/resume";
import { auth } from "@/app/auth";
import OpenAI from 'openai'

export type assistantProperties = {
    name: string
    instructions: string
    model: string
    responseFormat: any
}

export enum chatGptAsyncJobStatuses {
    CANCELLED = 'cancelled',
    COMPLETE = 'complete',
    FAILED = 'failed',
    UNKNOWN = 'unknown'
}

export enum chatGptAsyncJobTypes {
    BULLET_SUGGESTIONS = 'bulletSuggestions',
    SUMMARY_SUGGESTIONS = 'summarySuggestions'
}

export async function assistant(props: assistantProperties): Promise<ChatGptAssistant | null> {
    const session = await auth()
    const openai = new OpenAI()
    const service = new ChatGptAssistantService()

    if (session && session.user) {
        const existingAssitant = await service.getAssistantByNameAndUserId(props.name, session.user?.id as string)
        if (existingAssitant) {
            return existingAssitant
        } else {
            const assistantRemote = await openai.beta.assistants.create({
                name: props.name,
                instructions: props.instructions,
                model: props.model,
                response_format: props.responseFormat
            })
            const assistantLocal = await service.create({
                id: 0,
                userId: session.user.id as string,
                name: props.name,
                instructions: props.instructions,
                model: props.model,
                externalId: assistantRemote.id
            })
            return assistantLocal
        }
    } else {
        return null
    }
}

export async function assistantMessage(assistantId: string, prompt: string) {
    const session = await auth()
    const openai = new OpenAI()

    if (session && session.user) {
        const thread = await openai.beta.threads.create()

        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: prompt
        })

        let run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        })

        while (!run.completed_at) {
            run = await openai.beta.threads.runs.retrieve(thread.id, run.id)
        }

        const messages = await openai.beta.threads.messages.list(thread.id)

        return messages
    }
}

export async function assistantMessageAsync(assistant: ChatGptAssistant, resumeId: number, prompt: string, jobType: string): Promise<ChatGptAsyncJob> {
    const session = await auth()
    const openai = new OpenAI()
    const service = new ChatGptAsyncJobService()

    if (session && session.user) {
        const thread = await openai.beta.threads.create()

        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: prompt
        })

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.externalId,
        })

        return await service.create({
            id: 0,
            userId: session.user.id as string,
            assistantId: Number(assistant.id),
            jobType: jobType,
            resumeId: resumeId,
            runId: run.id,
            threadId: thread.id       
        }) as ChatGptAsyncJob
    } else {
        throw new Error('No user session')
    }
}

export type assistantMessageAsyncResult = {
    status: string
    messages?: OpenAI.Beta.Threads.Messages.MessagesPage
}

export async function assistantMessageAsyncResult(job: ChatGptAsyncJob) {
    const session = await auth()
    const openai = new OpenAI()
    const resumeService = new ResumeService()
    let result: assistantMessageAsyncResult = {
        status: chatGptAsyncJobStatuses.UNKNOWN
    }

    if (await resumeService.userOwnsItem(session?.user?.id as string, job.resumeId)) {
        const run = await openai.beta.threads.runs.retrieve(job.threadId, job.runId)
        if (run.completed_at) {
            result.messages = await openai.beta.threads.messages.list(job.threadId)
            result.status = chatGptAsyncJobStatuses.COMPLETE
        } else if (run.cancelled_at) {
            result.status = chatGptAsyncJobStatuses.CANCELLED
        } else if (run.failed_at) {
            result.status = chatGptAsyncJobStatuses.FAILED
        }
        return result
    } else {
        throw new Error('User does not own resume')
    }
}