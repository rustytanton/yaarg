import { Education as _EducationEntity } from "@prisma/client"
import prisma from "../db"
import { BaseRepository, BaseService, IMapper, IRepository } from "./_base"

export type EducationEntity = _EducationEntity

export type Education = {
    id: number
    userId: string
    institution?: string
    major?: string
    minor?: string
    startDate?: string
    endDate?: string
    graduated?: boolean
    gpa?: string
}

export class MapperEducation implements IMapper<Education, EducationEntity> {
    async toEntity(model: Education): Promise<EducationEntity> {
        return model as EducationEntity
    }
    async toModel(entity: EducationEntity): Promise<Education> {
        return entity as Education
    }
}

export class EducationRepository extends BaseRepository<Education, EducationEntity, typeof prisma.education> {
    constructor(
        mapper: IMapper<Education, EducationEntity> = new MapperEducation(),
        prismaModel: typeof prisma.education = prisma.education
    ) {
        super(mapper, prismaModel)
    }
}

export class EducationService extends BaseService<Education, EducationEntity, typeof prisma.education> {
    constructor(
        repo: IRepository<Education, EducationEntity, typeof prisma.education> = new EducationRepository()
    ) {
        super(repo)
        this.repo = repo
    }
}
