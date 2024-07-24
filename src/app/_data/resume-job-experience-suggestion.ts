import { ResumeJobExperienceSugggestion as _ResumeJobExperienceSugggestionEntity } from "@prisma/client";
import prisma from "../db";
import { BaseRepository, BaseService, IMapper } from "./_base";

export type ResumeJobExperienceSugggestionEntity = _ResumeJobExperienceSugggestionEntity

export type ResumeJobExperienceSugggestion = {
    id: number
    userId: string
    jobExperienceId: number
    suggestion: string
}

export class MapperResumeJobExperienceSugggestion implements IMapper<ResumeJobExperienceSugggestion, ResumeJobExperienceSugggestionEntity> {
    async toEntity(model: ResumeJobExperienceSugggestion): Promise<ResumeJobExperienceSugggestionEntity> {
        return model as ResumeJobExperienceSugggestionEntity
    }
    async toModel(entity: ResumeJobExperienceSugggestionEntity): Promise<ResumeJobExperienceSugggestion> {
        return entity as ResumeJobExperienceSugggestion
    }   
}

export class ResumeJobExperienceSugggestionRepository extends BaseRepository<ResumeJobExperienceSugggestion, ResumeJobExperienceSugggestionEntity, typeof prisma.resumeJobExperienceSugggestion> {
    constructor(
        mapper: MapperResumeJobExperienceSugggestion = new MapperResumeJobExperienceSugggestion(),
        prismaModel: typeof prisma.resumeJobExperienceSugggestion = prisma.resumeJobExperienceSugggestion
    ) {
        super(mapper, prismaModel)
    }

    async getSuggestionsByExperienceId(experienceId: number): Promise<ResumeJobExperienceSugggestion[]> {
        const entities = await this.prismaModel.findMany({
            where: {
                jobExperienceId: experienceId
            }
        })
        const results: ResumeJobExperienceSugggestion[] = []
        for (const entity of entities) {
            results.push(await this.mapper.toModel(entity))
        }
        return results
    }

    async deleteSuggestionsByExperienceId(experienceId: number): Promise<void> {
        await this.prismaModel.deleteMany({
            where: {
                jobExperienceId: experienceId
            }
        })
    }
}

export class ResumeJobExperienceSugggestionService extends BaseService<ResumeJobExperienceSugggestion, ResumeJobExperienceSugggestionEntity, typeof prisma.resumeJobExperienceSugggestion> {
    repo: ResumeJobExperienceSugggestionRepository
    
    constructor(
        repo: ResumeJobExperienceSugggestionRepository = new ResumeJobExperienceSugggestionRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getSuggestionsByExperienceId(experienceId: number): Promise<ResumeJobExperienceSugggestion[]> {
        return await this.repo.getSuggestionsByExperienceId(experienceId)
    }

    async deleteSuggestionsByExperienceId(experienceId: number): Promise<void> {
        await this.repo.deleteSuggestionsByExperienceId(experienceId)
    }
}