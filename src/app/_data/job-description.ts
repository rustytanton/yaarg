import { JobDescription as _JobDescriptionEntity } from "@prisma/client";
import prisma from "../db";
import { JobDescriptionSkill, JobDescriptionSkillService } from "./job-description-skill";
import { BaseRepository, BaseService, IMapper } from "./_base";

export type JobDescriptionEntity = _JobDescriptionEntity

export type JobDescription = {
    id: number
    userId: string
    text: string
    skills?: JobDescriptionSkill[]
}

export class MapperJobDescription implements IMapper<JobDescription, JobDescriptionEntity> {
    jdSkillService: JobDescriptionSkillService

    constructor(jdSkillService: JobDescriptionSkillService = new JobDescriptionSkillService()) {
        this.jdSkillService = jdSkillService
    }

    async toEntity(model: JobDescription): Promise<JobDescriptionEntity> {
        return {
            id: model.id,
            userId: model.userId,
            text: model.text
        }
    }
    async toModel(entity: JobDescriptionEntity): Promise<JobDescription> {
        return {
            ...entity,
            skills: await this.jdSkillService.getSkillsByJobDescriptionId(entity.id) || []
        }
    }
}

export class JobDescriptionRepository extends BaseRepository<JobDescription, JobDescriptionEntity, typeof prisma.jobDescription> {
    constructor(
        mapper: MapperJobDescription = new MapperJobDescription(),
        prismaModel: typeof prisma.jobDescription = prisma.jobDescription
    ) {
        super(mapper, prismaModel)
    }
}

export class JobDescriptionService extends BaseService<JobDescription, JobDescriptionEntity, typeof prisma.jobDescription> {
    constructor(
        repo: JobDescriptionRepository = new JobDescriptionRepository()
    ) {
        super(repo)
    }
}