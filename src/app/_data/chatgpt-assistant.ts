import { ChatGptAssistant } from "@prisma/client";
import prisma from "../db";

export type ChatGptAssistantEntity = ChatGptAssistant

export type ChatGptAssistantDTO = {
    id?: number | undefined
    userId: string
    externalId: string
    name: string
    instructions: string
    model: string
}

export function ChatGptAssistantEntityToDTO(entity: ChatGptAssistantEntity): ChatGptAssistantDTO {
    return entity as ChatGptAssistantDTO
}

export function ChatGptAssistantDTOtoEntity(dto: ChatGptAssistantDTO): ChatGptAssistantEntity {
    return dto as ChatGptAssistantEntity
}

export async function getChatGptAssistant(userId: string, assistantName: string) {
    const entity = await prisma.chatGptAssistant.findFirst({
        where: {
            name: assistantName,
            userId: userId
        }
    })
    return ChatGptAssistantEntityToDTO(entity as ChatGptAssistantEntity)
}

export async function createChatGptAssistant(assistant: ChatGptAssistantDTO): Promise<ChatGptAssistantDTO> {
    const entity = ChatGptAssistantDTOtoEntity(assistant)
    const result = await prisma.chatGptAssistant.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ChatGptAssistantEntityToDTO(result)
}