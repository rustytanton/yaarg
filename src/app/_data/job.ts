import { Job } from '@prisma/client'
import { parseMMYYYY } from '../_lib/util/dates'
import prisma from '../db'
import { ResumeJobExperienceDTOs } from './resume-job-experience'

export type JobEntity = Job
export type JobEntities = JobEntity[]

export type JobDTO = {
    id?: number | undefined
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
    experiences?: ResumeJobExperienceDTOs
}

export type JobDTOs = JobDTO[]

export function JobDTOtoEntity(dto: JobDTO): JobEntity {
    return {
        id: dto.id || 0,
        userId: dto.userId,
        employer: dto.employer,
        title: dto.title,
        location: dto.location,
        startDate: dto.startDate,
        endDate: dto.endDate,
        attendanceModel: dto.attendanceModel,
        stillWorksHere: dto.stillWorksHere
    }
}

export function JobEntitytoDTO(entity: JobEntity): JobDTO {
    return {
        id: entity.id || undefined,
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

export async function getJob(jobId: number): Promise<JobDTO> {
    const entity = await prisma.job.findFirst({
        where: {
            id: jobId
        }
    }) as JobEntity
    return JobEntitytoDTO(entity)
}

export async function getJobs(userId: string): Promise<JobDTOs> {
    const entities = await prisma.job.findMany({
        where: {
            userId: userId
        }
    })
    return entities.map(entity => JobEntitytoDTO(entity)).sort((a, b) => {
        if (a.startDateParsed === b.startDateParsed) {
            return 0
        } else {
            return a.startDateParsed > b.startDateParsed ? -1 : 1
        }
    })
}

export async function updateJob(job: JobDTO) {
    const entity = JobDTOtoEntity(job)
    await prisma.job.update({
        where: {
            id: job.id
        },
        data: {
            ...entity
        }
    })
}

export async function updateJobs(jobs: JobDTOs) {
    for (const dto of jobs) {
        await updateJob(dto)
    }
}

export async function createJob(job: JobDTO) {
    const entity = JobDTOtoEntity(job)
    const result = await prisma.job.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return JobEntitytoDTO(result)
}

export async function deleteJob(jobId: number) {
    await prisma.job.delete({
        where: {
            id: jobId
        }
    })
}

export async function userOwnsJob(userId: string, jobId: number) {
    const entity = await getJob(jobId)
    return userId === entity.userId
}