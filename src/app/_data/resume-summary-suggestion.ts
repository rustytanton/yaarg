import { ResumeSummarySuggestion as _ResumeSummarySuggestionEntity } from "@prisma/client"
import prisma from '../db'
import { BaseRepository, BaseService, IMapper } from "./_base"

export type ResumeSummarySuggestionEntity = _ResumeSummarySuggestionEntity

export type ResumeSummarySuggestion = {
    id: number,
    userId: string
    resumeId: number,
    suggestion: string
}

export class MapperResumeSummarySuggestion implements IMapper<ResumeSummarySuggestion, ResumeSummarySuggestionEntity> {
    async toEntity(model: ResumeSummarySuggestion): Promise<ResumeSummarySuggestionEntity> {
        return model as ResumeSummarySuggestionEntity
    }
    async toModel(entity: ResumeSummarySuggestionEntity): Promise<ResumeSummarySuggestion> {
        return entity as ResumeSummarySuggestion
    }
}

export class ResumeSummarySuggestionRepository extends BaseRepository<
    ResumeSummarySuggestion, ResumeSummarySuggestionEntity, typeof prisma.resumeSummarySuggestion
> {
    constructor(
        mapper: MapperResumeSummarySuggestion = new MapperResumeSummarySuggestion(),
        prismaModel: typeof prisma.resumeSummarySuggestion = prisma.resumeSummarySuggestion
    ) {
        super(mapper, prismaModel)
    }

    async getAllByResumeId(resumeId: number): Promise<ResumeSummarySuggestion[]> {
        const entities = await this.prismaModel.findMany({
            where: {
                resumeId: resumeId
            }
        })
        const results: ResumeSummarySuggestion[] = []
        for (const entity of entities) {
            results.push(await this.mapper.toModel(entity))
        }
        return results
    }

    async deleteAllByResumeId(resumeId: number): Promise<void> {
        await this.prismaModel.deleteMany({
            where: {
                resumeId: resumeId
            }
        })
    }
}

export class ResumeSummarySuggestionService extends BaseService<ResumeSummarySuggestion, ResumeSummarySuggestionEntity, typeof prisma.resumeSummarySuggestion> {
    repo: ResumeSummarySuggestionRepository
    
    constructor(
        repo: ResumeSummarySuggestionRepository = new ResumeSummarySuggestionRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getAllByResumeId(resumeId: number): Promise<ResumeSummarySuggestion[]> {
        return await this.repo.getAllByResumeId(resumeId)
    }

    async deleteAllByResumeId(resumeId: number): Promise<void> {
        return await this.repo.deleteAllByResumeId(resumeId)
    }
}