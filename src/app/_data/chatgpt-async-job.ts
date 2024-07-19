import { ChatGptAsyncJob as _ChatGptAsyncJobEntity } from "@prisma/client";
import prisma from "../db";

export type ChatGptAsyncJobEntity = _ChatGptAsyncJobEntity
export type ChatGptAsyncJobEntities = ChatGptAsyncJobEntity[]

export type ChatGptAsyncJob = {
    id?: number
    assistantId: number
    resumeId: number
    runId: string
    threadId: string
}
export type ChatGptAsyncJobs = ChatGptAsyncJob[]

export function ChatGptAsyncJobModelToEntity(model: ChatGptAsyncJob) {
    return model as ChatGptAsyncJobEntity
}

export function ChatGptAsyncJobEntityToModel(entity: ChatGptAsyncJobEntity) {
    return entity as ChatGptAsyncJob
}

export async function getChatGptAsyncJob(jobId: number) {
    const entity = await prisma.chatGptAsyncJob.findFirst({
        where: {
            id: jobId
        }
    }) as ChatGptAsyncJobEntity
    return ChatGptAsyncJobEntityToModel(entity)
}

export async function getChatGptAsyncJobs(resumeId?: number): Promise<ChatGptAsyncJobs> {
    const entities = await prisma.chatGptAsyncJob.findMany({
        where: {
            resumeId: resumeId
        }
    })
    return entities.map(entity => ChatGptAsyncJobEntityToModel(entity))
}

export async function createChatGptAsyncJob(job: ChatGptAsyncJob) {
    const entity = ChatGptAsyncJobModelToEntity(job)
    const result = await prisma.chatGptAsyncJob.create({
        data: {
            ...entity
        }
    })
    return ChatGptAsyncJobEntityToModel(result)
}

export async function deleteChatGptAsyncJob(jobId: number) {
    await prisma.chatGptAsyncJob.delete({
        where: {
            id: jobId
        }
    })
}