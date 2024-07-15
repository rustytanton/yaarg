import { ResumeJobExperienceSkill as _ResumeJobExperienceSkillEntity } from "@prisma/client";
import prisma from "../db";

export type ResumeJobExperienceSkillEntity = _ResumeJobExperienceSkillEntity
export type ResumeJobExperienceSkillEntities = ResumeJobExperienceSkillEntity[]

export type ResumeJobExperienceSkill = {
    id?: number
    jobExperienceId: number
    skill: string
}
export type ResumeJobExperienceSkills = ResumeJobExperienceSkill[]

export function ResumeJobExperienceSkillModeltoEntity(model: ResumeJobExperienceSkill): ResumeJobExperienceSkillEntity {
    return model as ResumeJobExperienceSkillEntity
}

export function ResumeJobExperienceSkillEntityToModel(entity: ResumeJobExperienceSkillEntity): ResumeJobExperienceSkill {
    return entity as ResumeJobExperienceSkill
}

export async function getResumeJobExperienceSkill(skillId: number): Promise<ResumeJobExperienceSkill> {
    const entity = await prisma.resumeJobExperienceSkill.findFirst({
        where: {
            id: skillId
        }
    }) as ResumeJobExperienceSkillEntity
    return ResumeJobExperienceSkillEntityToModel(entity)
}

export async function getResumeJobExperienceSkills(experienceId: number): Promise<ResumeJobExperienceSkills> {
    const entities = await prisma.resumeJobExperienceSkill.findMany({
        where: {
            jobExperienceId: experienceId
        }
    })
    return entities.map(entity => ResumeJobExperienceSkillEntityToModel(entity))
}

export async function createResumeJobExperienceSkill(experience: ResumeJobExperienceSkill): Promise<ResumeJobExperienceSkill> {
    const entity = ResumeJobExperienceSkillModeltoEntity(experience)
    const result = await prisma.resumeJobExperienceSkill.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeJobExperienceSkillEntityToModel(result)
}

export async function deleteResumeJobExperienceSkill(skillId: number) {
    await prisma.resumeJobExperienceSkill.delete({
        where: {
            id: skillId
        }
    })
}

export async function deleteResumeJobExperienceSkills(experienceId: number) {
    await prisma.resumeJobExperienceSkill.deleteMany({
        where: {
            jobExperienceId: experienceId
        }
    })
}
