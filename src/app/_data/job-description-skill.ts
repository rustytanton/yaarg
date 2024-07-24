import { JobDescriptionSkill as _JobDescriptionSkillEntity } from "@prisma/client";
import prisma from "../db";
import { BaseRepository, BaseService, IMapper } from "./_base";

export type JobDescriptionSkillEntity = _JobDescriptionSkillEntity

export type JobDescriptionSkill = {
    id: number
    userId: string
    jobDescriptionId: number
    skill: string
    mentions: number,
    usedInResume: boolean
}

export class MapperJobDescriptionSkill implements IMapper<JobDescriptionSkill, JobDescriptionSkillEntity> {
    async toEntity(model: JobDescriptionSkill): Promise<JobDescriptionSkillEntity> {
        return model as JobDescriptionSkillEntity
    }
    async toModel(entity: JobDescriptionSkillEntity): Promise<JobDescriptionSkill> {
        return entity as JobDescriptionSkill
    }
}

export class JobDescriptionSkillRepository extends BaseRepository<JobDescriptionSkill, JobDescriptionSkillEntity, typeof prisma.jobDescriptionSkill> {
    constructor(
        mapper: MapperJobDescriptionSkill = new MapperJobDescriptionSkill(),
        prismaModel: typeof prisma.jobDescriptionSkill = prisma.jobDescriptionSkill
    ) {
        super(mapper, prismaModel)
    }

    async getSkillsByJobDescriptionId(jobDescriptionId: number): Promise<JobDescriptionSkill[] | null> {
        const entities = await this.prismaModel.findMany({
            where: {
                jobDescriptionId: jobDescriptionId
            }
        })
        const results: JobDescriptionSkill[] = []
        for (const entity of entities) {
            results.push(await this.mapper.toModel(entity))
        }
        return results
    }

    async setJobDescriptionSkillUsedBySkillName(jobDescriptionId: number, skillName: string) {
        await this.prismaModel.updateMany({
            where: {
                jobDescriptionId: jobDescriptionId,
                skill: skillName
            },
            data: {
                usedInResume: true 
            }
        })
    }

    async resetJobDescriptionSkillsUsedField(jobDescriptionId: number) {
        await this.prismaModel.updateMany({
            where: {
                jobDescriptionId: jobDescriptionId
            },
            data: {
                usedInResume: false
            }
        })
    }
}

export class JobDescriptionSkillService extends BaseService<JobDescriptionSkill, JobDescriptionSkillEntity, typeof prisma.jobDescriptionSkill> {
    repo: JobDescriptionSkillRepository

    constructor(
        repo: JobDescriptionSkillRepository = new JobDescriptionSkillRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async getSkillsByJobDescriptionId(jobDescriptionId: number): Promise<JobDescriptionSkill[] | null> {
        return await this.repo.getSkillsByJobDescriptionId(jobDescriptionId)
    }

    async setJobDescriptionSkillUsedBySkillName(jobDescriptionId: number, skillName: string) {
        await this.repo.setJobDescriptionSkillUsedBySkillName(jobDescriptionId, skillName)
    }

    async resetJobDescriptionSkillsUsedField(jobDescriptionId: number) {
        await this.repo.resetJobDescriptionSkillsUsedField(jobDescriptionId)
    }
}
