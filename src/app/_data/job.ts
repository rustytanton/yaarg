import { Job as _JobEntity } from '@prisma/client'
import { parseMMYYYY } from '../_lib/util/dates'
import prisma from '../db'
import { ResumeJobExperiences } from './resume-job-experience'

export type JobEntity = _JobEntity
export type JobEntities = JobEntity[]

export type Job = {
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
    experiences?: ResumeJobExperiences
}

export type Jobs = Job[]

export function JobModeltoEntity(model: Job): JobEntity {
    return {
        id: model.id || 0,
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

export function JobEntitytoModel(entity: JobEntity): Job {
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

export async function getJob(jobId: number): Promise<Job> {
    const entity = await prisma.job.findFirst({
        where: {
            id: jobId
        }
    }) as JobEntity
    return JobEntitytoModel(entity)
}

export async function getJobs(userId: string): Promise<Jobs> {
    const entities = await prisma.job.findMany({
        where: {
            userId: userId
        }
    })
    return entities.map(entity => JobEntitytoModel(entity)).sort((a, b) => {
        if (a.startDateParsed === b.startDateParsed) {
            return 0
        } else {
            return a.startDateParsed > b.startDateParsed ? -1 : 1
        }
    })
}

export async function updateJob(job: Job) {
    const entity = JobModeltoEntity(job)
    await prisma.job.update({
        where: {
            id: job.id
        },
        data: {
            ...entity
        }
    })
}

export async function updateJobs(jobs: Jobs) {
    for (const job of jobs) {
        await updateJob(job)
    }
}

export async function createJob(job: Job) {
    const entity = JobModeltoEntity(job)
    const result = await prisma.job.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return JobEntitytoModel(result)
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