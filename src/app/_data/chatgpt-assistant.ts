import { ChatGptAssistant as _ChatGptAssistantEntity } from "@prisma/client";
import { BaseEntity, BaseModel, BaseRepository, BaseService, IMapper, IRepository, PrismaFootprint } from './_base'
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

interface IChatGptAssistantRepository<
    Model extends BaseModel,
    Entity extends BaseEntity,
    PrismaModel extends PrismaFootprint<Entity>
> extends IRepository<Model, Entity, PrismaModel> {
    getAssistantByNameAndUserId(assistantName: string, userId: string): Promise<Model | null>
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
    repo: IChatGptAssistantRepository<ChatGptAssistant, ChatGptAssistantEntity, typeof prisma.chatGptAssistant>
    
    constructor(
        repo: IChatGptAssistantRepository<ChatGptAssistant, ChatGptAssistantEntity, typeof prisma.chatGptAssistant> = new ChatGptAssistantRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getAssistantByNameAndUserId(assistantName: string, userId: string): Promise<ChatGptAssistant | null> {
        return await this.repo.getAssistantByNameAndUserId(assistantName, userId)
    }
}
