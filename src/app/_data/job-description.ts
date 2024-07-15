import { JobDescription as _JobDescriptionEntity } from "@prisma/client";
import prisma from "../db";
import { getJobDescriptionSkills, JobDescriptionSkills } from "./job-description-skill";

export type JobDescriptionEntity = _JobDescriptionEntity

export type JobDescription = {
    id?: number | undefined
    userId: string
    text: string
    skills?: JobDescriptionSkills
}

export async function JobDescriptionEntityToModel(entity: JobDescriptionEntity): Promise<JobDescription> {
    return {
        ...entity,
        skills: await getJobDescriptionSkills(entity.id)
    }
}

export function JobDescriptionModeltoEntity(model: JobDescription): JobDescriptionEntity {
    return {
        id: model.id || 0,
        userId: model.userId,
        text: model.text
    }
}

export async function getJobDescription(jobDescriptionId: number) {
    const entity = await prisma.jobDescription.findFirst({
        where: {
            id: jobDescriptionId
        }
    })
    return await JobDescriptionEntityToModel(entity as JobDescriptionEntity)
}

export async function createJobDescription(jobDescription: JobDescription) {
    const entity = JobDescriptionModeltoEntity(jobDescription)
    const result = await prisma.jobDescription.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return await JobDescriptionEntityToModel(result)
}

export async function userOwnsJobDescription(jobDescriptionId: number, userId: string) {
    const entity = await getJobDescription(jobDescriptionId)
    return entity.userId === userId
}