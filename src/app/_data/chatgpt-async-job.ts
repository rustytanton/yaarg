import { ChatGptAsyncJob as _ChatGptAsyncJobEntity } from "@prisma/client";
import prisma from "../db";
import { BaseRepository, BaseService, IMapper } from "./_base";

export type ChatGptAsyncJobEntity = _ChatGptAsyncJobEntity

export type ChatGptAsyncJob = {
    id: number
    userId: string
    jobType: string
    assistantId: number
    resumeId: number
    runId: string
    threadId: string
}
export type ChatGptAsyncJobs = ChatGptAsyncJob[]


export class MapperChatGptAsyncJob implements IMapper<ChatGptAsyncJob, ChatGptAsyncJobEntity> {
    async toEntity(model: ChatGptAsyncJob): Promise<ChatGptAsyncJobEntity> {
        return model as ChatGptAsyncJobEntity
    }
    async toModel(entity: ChatGptAsyncJobEntity): Promise<ChatGptAsyncJob> {
        return entity as ChatGptAsyncJob
    }
}

export class ChatGptAsyncJobRepository extends BaseRepository<ChatGptAsyncJob, ChatGptAsyncJobEntity, typeof prisma.chatGptAsyncJob> {
    constructor(
        mapper: IMapper<ChatGptAsyncJob, ChatGptAsyncJobEntity> = new MapperChatGptAsyncJob(),
        prismaModel: typeof prisma.chatGptAsyncJob = prisma.chatGptAsyncJob
    ) {
        super(mapper, prismaModel)
    }

    async getJobsByResumeId(resumeId: number): Promise<ChatGptAsyncJob[] | null> {
        const entities = await this.prismaModel.findMany({
            where: {
                resumeId: resumeId
            }
        })
        const results: ChatGptAsyncJob[] = []
        for (const entity of entities) {
            results.push(await this.mapper.toModel(entity))
        }
        return results
    }
}

export class ChatGptAsyncJobService extends BaseService<ChatGptAsyncJob, ChatGptAsyncJobEntity, typeof prisma.chatGptAsyncJob> {
    repo: ChatGptAsyncJobRepository
    
    constructor(
        repo: ChatGptAsyncJobRepository = new ChatGptAsyncJobRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getJobsByResumeId(resumeId: number): Promise<ChatGptAsyncJob[] | null> {
        return await this.repo.getJobsByResumeId(resumeId)
    }
}
