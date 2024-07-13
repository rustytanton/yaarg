import { JobDescriptionSkill } from "@prisma/client";
import prisma from "../db";

export type JobDescriptionSkillEntity = JobDescriptionSkill
export type JobDescriptionSkillEntities = JobDescriptionSkillEntity[]

export type JobDescriptionSkillDTO = {
    id?: number | undefined
    jobDescriptionId: number
    skill: string
    mentions: number,
    usedInResume: boolean
}
export type JobDescriptionSkillDTOs = JobDescriptionSkillDTO[]

export function JobDescriptionSkillDTOtoEntity(dto: JobDescriptionSkillDTO): JobDescriptionSkillEntity {
    return dto as JobDescriptionSkillEntity
}

export function JobDescriptionSkillEntityToDTO(entity: JobDescriptionSkillEntity): JobDescriptionSkillDTO {
    return entity as JobDescriptionSkillDTO
}

export async function createJobDescriptionSkill(dto: JobDescriptionSkillDTO) {
    const entity = JobDescriptionSkillDTOtoEntity(dto)
    const result = await prisma.jobDescriptionSkill.create({
        data: {
            ...entity
        }
    })
    return JobDescriptionSkillEntityToDTO(result)
}

export async function getJobDescriptionSkills(jobDescriptionId: number): Promise<JobDescriptionSkillDTOs> {
    const entities = await prisma.jobDescriptionSkill.findMany({
        where: {
            jobDescriptionId: jobDescriptionId
        }
    })
    return entities.map(skill => JobDescriptionSkillEntityToDTO(skill))
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