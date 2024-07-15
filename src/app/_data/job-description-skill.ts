import { JobDescriptionSkill as _JobDescriptionSkillEntity } from "@prisma/client";
import prisma from "../db";

export type JobDescriptionSkillEntity = _JobDescriptionSkillEntity
export type JobDescriptionSkillEntities = JobDescriptionSkillEntity[]

export type JobDescriptionSkill = {
    id?: number | undefined
    jobDescriptionId: number
    skill: string
    mentions: number,
    usedInResume: boolean
}
export type JobDescriptionSkills = JobDescriptionSkill[]

export function JobDescriptionSkillModeltoEntity(model: JobDescriptionSkill): JobDescriptionSkillEntity {
    return model as JobDescriptionSkillEntity
}

export function JobDescriptionSkillEntityToModel(entity: JobDescriptionSkillEntity): JobDescriptionSkill {
    return entity as JobDescriptionSkill
}

export async function createJobDescriptionSkill(model: JobDescriptionSkill) {
    const entity = JobDescriptionSkillModeltoEntity(model)
    const result = await prisma.jobDescriptionSkill.create({
        data: {
            ...entity
        }
    })
    return JobDescriptionSkillEntityToModel(result)
}

export async function getJobDescriptionSkills(jobDescriptionId: number): Promise<JobDescriptionSkills> {
    const entities = await prisma.jobDescriptionSkill.findMany({
        where: {
            jobDescriptionId: jobDescriptionId
        }
    })
    return entities.map(skill => JobDescriptionSkillEntityToModel(skill))
}

export async function setJobDescriptionSkillUsedBySkillName(jobDescriptionId: number, skillName: string) {
    await prisma.jobDescriptionSkill.updateMany({
        where: {
            jobDescriptionId: jobDescriptionId,
            skill: skillName
        },
        data: {
            usedInResume: true
        }
    })
}

export async function resetJobDescriptionSkillsUsedField(jobDescriptionId: number) {
    await prisma.jobDescriptionSkill.updateMany({
        where: {
            jobDescriptionId: jobDescriptionId
        },
        data: {
            usedInResume: false
        }
    })
}