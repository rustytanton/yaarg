import { ResumeJobExperience as _ResumeJobExperienceEntity } from "@prisma/client";
import prisma from "../db";
import { ResumeJobExperienceSkill, ResumeJobExperienceSkillService } from "./resume-job-experience-skill";
import { ResumeJobExperienceSugggestion, ResumeJobExperienceSugggestionService } from "./resume-job-experience-suggestion";
import { BaseRepository, BaseService, IMapper } from "./_base";

export type ResumeJobExperienceEntity = _ResumeJobExperienceEntity

export type ResumeJobExperience = {
    id: number
    userId: string
    jobId: number
    resumeId: number
    content: string
    skills?: ResumeJobExperienceSkill[]
    suggestions?: ResumeJobExperienceSugggestion[]
}

export class MapperResumeJobExperience implements IMapper<ResumeJobExperience, ResumeJobExperienceEntity> {

    jobExpSkillsService: ResumeJobExperienceSkillService
    jobExpSuggestionService: ResumeJobExperienceSugggestionService

    constructor(
        jobExpSkillsService: ResumeJobExperienceSkillService = new ResumeJobExperienceSkillService(),
        jobExpSuggestionService: ResumeJobExperienceSugggestionService = new ResumeJobExperienceSugggestionService()
    ) {
        this.jobExpSkillsService = jobExpSkillsService
        this.jobExpSuggestionService = jobExpSuggestionService
    }
    
    async toEntity(model: ResumeJobExperience): Promise<ResumeJobExperienceEntity> {
        return {
            id: model.id,
            userId: model.userId,
            jobId: Number(model.jobId),
            resumeId: model.resumeId,
            content: model.content
        }
    }
    async toModel(entity: ResumeJobExperienceEntity): Promise<ResumeJobExperience> {
        return {
            ...entity,
            skills: await this.jobExpSkillsService.getSkillsByExperienceId(Number(entity.id)),
            suggestions: await this.jobExpSuggestionService.getSuggestionsByExperienceId(Number(entity.id))
        }
    }   
}

type uniqueResumeJobExperiencesResult = {
    id: string
}

export class ResumeJobExperienceRepository extends BaseRepository<
    ResumeJobExperience, ResumeJobExperienceEntity, typeof prisma.resumeJobExperience
> {
    constructor(
        mapper: MapperResumeJobExperience = new MapperResumeJobExperience(),
        prismaModel: typeof prisma.resumeJobExperience = prisma.resumeJobExperience
    ) {
        super(mapper, prismaModel)
    }

    async getAllByResumeIdAndJobId(resumeId: number, jobId: number): Promise<ResumeJobExperience[]> {
        const entities = await this.prismaModel.findMany({
            where: {
                jobId: jobId,
                resumeId: resumeId
            }
        }) as ResumeJobExperienceEntity[]
        const result: ResumeJobExperience[] = []
        for (const entity of entities) {
            result.push(await this.mapper.toModel(entity))
        }
        return result
    }

    async deleteAllByJobId(jobId: number): Promise<void> {
        await this.prismaModel.deleteMany({
            where: {
                jobId: jobId
            }
        })
    }

    async deleteAllByJobIdAndResumeId(jobId: number, resumeId: number): Promise<void> {
        await this.prismaModel.deleteMany({
            where: {
                jobId: jobId,
                resumeId: resumeId
            }
        })
    }

    async getAllUniqueByJobId(jobId: number): Promise<ResumeJobExperience[]> {
        let resultIds: uniqueResumeJobExperiencesResult[] = await prisma.$queryRaw`
            SELECT DISTINCT ON (content) id FROM "ResumeJobExperience" WHERE "jobId" = ${jobId}
        `
        const results: ResumeJobExperience[] = []
        for (const resultId of resultIds) {
            results.push(await this.get(Number(resultId.id)) as ResumeJobExperience)
        }
        return results
    }
}

export class ResumeJobExperienceService extends BaseService<
    ResumeJobExperience, ResumeJobExperienceEntity, typeof prisma.resumeJobExperience
> {
    repo: ResumeJobExperienceRepository
    
    constructor(
        repo: ResumeJobExperienceRepository = new ResumeJobExperienceRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getAllByResumeIdAndJobId(resumeId: number, jobId: number): Promise<ResumeJobExperience[]> {
        return await this.repo.getAllByResumeIdAndJobId(resumeId, jobId)
    }

    async deleteAllByJobId(jobId: number): Promise<void> {
        await this.repo.deleteAllByJobId(jobId)
    }

    async deleteAllByJobIdAndResumeId(jobId: number, resumeId: number): Promise<void> {
        await this.repo.deleteAllByJobIdAndResumeId(jobId, resumeId)
    }
    
    async getAllUniqueByJobId(jobId: number) {
        return this.repo.getAllUniqueByJobId(jobId)
    }
}
