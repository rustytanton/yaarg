import { ChatGptAssistant as _ChatGptAssistantEntity } from "@prisma/client";
import { BaseRepository, BaseService, IMapper } from './_base'
import prisma from "../db";

export type ChatGptAssistantEntity = _ChatGptAssistantEntity

export type ChatGptAssistant = {
    id: number
    userId: string
    externalId: string
    name: string
    instructions: string
    model: string
}

export class MapperChatGptAssistant implements IMapper<ChatGptAssistant, ChatGptAssistantEntity> {
    async toEntity(model: ChatGptAssistant): Promise<ChatGptAssistantEntity> {
        return model as ChatGptAssistantEntity
    }
    async toModel(entity: ChatGptAssistantEntity): Promise<ChatGptAssistant> {
        return entity as ChatGptAssistant
    }
}

export class ChatGptAssistantRepository extends BaseRepository<ChatGptAssistant, ChatGptAssistantEntity, typeof prisma.chatGptAssistant> {
    constructor(
        mapper: IMapper<ChatGptAssistant, ChatGptAssistantEntity> = new MapperChatGptAssistant(),
        prismaModel: typeof prisma.chatGptAssistant = prisma.chatGptAssistant
    ) {
        super(mapper, prismaModel)
    }

    async getAssistantByNameAndUserId(assistantName: string, userId: string): Promise<ChatGptAssistant | null> {
        const entity = await this.prismaModel.findFirst({
            where: {
                name: assistantName,
                userId: userId
            }
        })
        return entity ? this.mapper.toModel(entity) : null
    }
}

export class ChatGptAssistantService extends BaseService<ChatGptAssistant, ChatGptAssistantEntity, typeof prisma.chatGptAssistant> {
    repo: ChatGptAssistantRepository
    
    constructor(
        repo: ChatGptAssistantRepository = new ChatGptAssistantRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getAssistantByNameAndUserId(assistantName: string, userId: string): Promise<ChatGptAssistant | null> {
        return await this.repo.getAssistantByNameAndUserId(assistantName, userId)
    }
}
