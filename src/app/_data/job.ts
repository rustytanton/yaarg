import { Job as _JobEntity } from '@prisma/client'
import { parseMMYYYY } from '../_lib/util/dates'
import prisma from '../db'
import { ResumeJobExperience } from './resume-job-experience'
import { BaseRepository, BaseService, IMapper } from './_base'

export type JobEntity = _JobEntity

export type Job = {
    id: number
    userId: string
    employer: string
    title: string
    location: string
    startDate: string
    startDateParsed: Date
    endDate: string
    endDateParsed: Date
    attendanceModel: string
    stillWorksHere: boolean
    experiences?: ResumeJobExperience[]
}

export class MapperJob implements IMapper<Job, JobEntity> {
    async toEntity(model: Job): Promise<JobEntity> {
        return {
            id: model.id,
            userId: model.userId,
            employer: model.employer,
            title: model.title,
            location: model.location,
            startDate: model.startDate,
            endDate: model.endDate,
            attendanceModel: model.attendanceModel,
            stillWorksHere: model.stillWorksHere
        }
    }
    async toModel(entity: JobEntity): Promise<Job> {
        
        return {
            id: entity.id,
            userId: entity.userId as string,
            employer: entity.employer as string,
            title: entity.title as string,
            location: entity.location as string,
            startDate: entity.startDate as string,
            startDateParsed: parseMMYYYY(entity.startDate),
            endDate: entity.endDate as string,
            endDateParsed: parseMMYYYY(entity.endDate),
            attendanceModel: entity.attendanceModel as string,
            stillWorksHere: entity.stillWorksHere as boolean
        }
    }
}

export class JobRepository extends BaseRepository<Job, JobEntity, typeof prisma.job> {
    constructor(
        mapper: MapperJob = new MapperJob(),
        prismaModel: typeof prisma.job = prisma.job
    ) {
        super(mapper, prismaModel)
    }
}

export class JobService extends BaseService<Job, JobEntity, typeof prisma.job> {
    constructor(
        repo: JobRepository = new JobRepository()
    ) {
        super(repo)
    }
}