import { JobDescription as _JobDescriptionEntity } from "@prisma/client";
import prisma from "../db";
import { JobDescriptionSkill, JobDescriptionSkillService } from "./job-description-skill";

export type JobDescriptionEntity = _JobDescriptionEntity

export type JobDescription = {
    id?: number | undefined
    userId: string
    text: string
    skills?: JobDescriptionSkill[]
}

export async function JobDescriptionEntityToModel(entity: JobDescriptionEntity): Promise<JobDescription> {
    const jdService = new JobDescriptionSkillService()
    return {
        ...entity,
        skills: await jdService.getSkillsByJobDescriptionId(entity.id) as JobDescriptionSkill[]
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