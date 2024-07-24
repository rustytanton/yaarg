import { ChatGptAssistant, ChatGptAssistantService } from "@/app/_data/chatgpt-assistant";
import { ChatGptAsyncJob, createChatGptAsyncJob } from "@/app/_data/chatgpt-async-job";
import { userOwnsResume } from "@/app/_data/resume";
import { auth } from "@/app/auth";
import OpenAI from 'openai'

export type assistantProperties = {
    name: string
    instructions: string
    model: string
}

export enum chatGptAsyncJobStatuses {
    CANCELLED = 'cancelled',
    COMPLETE = 'complete',
    FAILED = 'failed',
    UNKNOWN = 'unknown'
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
                tools: [{ type: 'code_interpreter' }]
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

export async function assistantMessageAsync(assistant: ChatGptAssistant, resumeId: number, prompt: string): Promise<ChatGptAsyncJob> {
    const session = await auth()
    const openai = new OpenAI()

    if (session && session.user) {
        const thread = await openai.beta.threads.create()

        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: prompt
        })

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.externalId,
        })

        return await createChatGptAsyncJob({
            assistantId: Number(assistant.id),
            resumeId: resumeId,
            runId: run.id,
            threadId: thread.id            
        })
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
    let result: assistantMessageAsyncResult = {
        status: chatGptAsyncJobStatuses.UNKNOWN
    }

    if (await userOwnsResume(job.resumeId, session?.user?.id as string)) {
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