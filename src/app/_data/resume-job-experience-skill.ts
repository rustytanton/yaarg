import { ResumeJobExperienceSkill } from "@prisma/client";
import prisma from "../db";

export type ResumeJobExperienceSkillEntity = ResumeJobExperienceSkill
export type ResumeJobExperienceSkillEntities = ResumeJobExperienceSkillEntity[]

export type ResumeJobExperienceSkillDTO = {
    id?: number
    jobExperienceId: number
    skill: string
}
export type ResumeJobExperienceSkillDTOs = ResumeJobExperienceSkillDTO[]

export function ResumeJobExperienceSkillDTOtoEntity(dto: ResumeJobExperienceSkillDTO): ResumeJobExperienceSkillEntity {
    return dto as ResumeJobExperienceSkillEntity
}

export function ResumeJobExperienceSkillEntityToDTO(entity: ResumeJobExperienceSkillEntity): ResumeJobExperienceSkillDTO {
    return entity as ResumeJobExperienceSkillDTO
}

export async function getResumeJobExperienceSkill(skillId: number): Promise<ResumeJobExperienceSkillDTO> {
    const entity = await prisma.resumeJobExperienceSkill.findFirst({
        where: {
            id: skillId
        }
    }) as ResumeJobExperienceSkillEntity
    return ResumeJobExperienceSkillEntityToDTO(entity)
}

export async function getResumeJobExperienceSkills(experienceId: number): Promise<ResumeJobExperienceSkillDTOs> {
    const entities = await prisma.resumeJobExperienceSkill.findMany({
        where: {
            jobExperienceId: experienceId
        }
    })
    return entities.map(entity => ResumeJobExperienceSkillEntityToDTO(entity))
}

export async function createResumeJobExperienceSkill(experience: ResumeJobExperienceSkillDTO): Promise<ResumeJobExperienceSkillDTO> {
    const entity = ResumeJobExperienceSkillDTOtoEntity(experience)
    const result = await prisma.resumeJobExperienceSkill.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeJobExperienceSkillEntityToDTO(result)
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
