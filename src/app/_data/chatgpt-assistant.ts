import { ChatGptAssistant as _ChatGptAssistantEntity } from "@prisma/client";
import prisma from "../db";

export type ChatGptAssistantEntity = _ChatGptAssistantEntity

export type ChatGptAssistant = {
    id?: number
    userId: string
    externalId: string
    name: string
    instructions: string
    model: string
}

export function ChatGptAssistantEntityToModel(entity: ChatGptAssistantEntity): ChatGptAssistant {
    return entity as ChatGptAssistant
}

export function ChatGptAssistantModeltoEntity(model: ChatGptAssistant): ChatGptAssistantEntity {
    return model as ChatGptAssistantEntity
}

export async function getChatGptAssistant(userId: string, assistantName: string) {
    const entity = await prisma.chatGptAssistant.findFirst({
        where: {
            name: assistantName,
            userId: userId
        }
    })
    return ChatGptAssistantEntityToModel(entity as ChatGptAssistantEntity)
}

export async function createChatGptAssistant(assistant: ChatGptAssistant): Promise<ChatGptAssistant> {
    const entity = ChatGptAssistantModeltoEntity(assistant)
    const result = await prisma.chatGptAssistant.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ChatGptAssistantEntityToModel(result)
}