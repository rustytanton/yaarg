import { ResumeJobExperienceSkill as _ResumeJobExperienceSkillEntity } from "@prisma/client";
import prisma from "../db";
import { BaseRepository, BaseService, IMapper } from "./_base";

export type ResumeJobExperienceSkillEntity = _ResumeJobExperienceSkillEntity

export type ResumeJobExperienceSkill = {
    id: number
    userId: string,
    jobExperienceId: number
    skill: string
}

export class MapperResumeJobExperienceSkill implements IMapper<ResumeJobExperienceSkill, ResumeJobExperienceSkillEntity> {
    async toEntity(model: ResumeJobExperienceSkill): Promise<ResumeJobExperienceSkillEntity> {
        return model as ResumeJobExperienceSkillEntity
    }
    async toModel(entity: ResumeJobExperienceSkillEntity): Promise<ResumeJobExperienceSkill> {
        return entity as ResumeJobExperienceSkill
    }   
}

export class ResumeJobExperienceSkillRepository extends BaseRepository<ResumeJobExperienceSkill, ResumeJobExperienceSkillEntity, typeof prisma.resumeJobExperienceSkill> {
    constructor(
        mapper: MapperResumeJobExperienceSkill = new MapperResumeJobExperienceSkill(),
        prismaModel: typeof prisma.resumeJobExperienceSkill = prisma.resumeJobExperienceSkill
    ) {
        super(mapper, prismaModel)
    }

    async getSkillsByExperienceId(experienceId: number): Promise<ResumeJobExperienceSkill[]> {
        const entities = await this.prismaModel.findMany({
            where: {
                jobExperienceId: experienceId
            }
        })
        const results: ResumeJobExperienceSkill[] = []
        for (const entity of entities) {
            results.push(await this.mapper.toModel(entity))
        }
        return results
    }

    async deleteSkillsByExperienceId(experienceId: number): Promise<void> {
        await this.prismaModel.deleteMany({
            where: {
                jobExperienceId: experienceId
            }
        })
    }
}

export class ResumeJobExperienceSkillService extends BaseService<ResumeJobExperienceSkill, ResumeJobExperienceSkillEntity, typeof prisma.resumeJobExperienceSkill> {
    repo: ResumeJobExperienceSkillRepository
    
    constructor(
        repo: ResumeJobExperienceSkillRepository = new ResumeJobExperienceSkillRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getSkillsByExperienceId(experienceId: number): Promise<ResumeJobExperienceSkill[]> {
        return await this.repo.getSkillsByExperienceId(experienceId)
    }

    async deleteSkillsByExperienceId(experienceId: number): Promise<void> {
        await this.repo.deleteSkillsByExperienceId(experienceId)
    }
}
