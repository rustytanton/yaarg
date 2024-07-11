import { JobDescription } from "@prisma/client";
import prisma from "../db";
import { getJobDescriptionSkills, JobDescriptionSkillDTOs } from "./job-description-skill";

export type JobDescriptionEntity = JobDescription

export type JobDescriptionDTO = {
    id?: number | undefined
    userId: string
    text: string
    skills?: JobDescriptionSkillDTOs
}

export async function JobDescriptionEntityToDTO(entity: JobDescriptionEntity): Promise<JobDescriptionDTO> {
    return {
        ...entity,
        skills: await getJobDescriptionSkills(entity.id)
    }
}

export function JobDescriptionDTOtoEntity(dto: JobDescriptionDTO): JobDescriptionEntity {
    return {
        id: dto.id || 0,
        userId: dto.userId,
        text: dto.text
    }
}

export async function getJobDescription(jobDescriptionId: number) {
    const entity = await prisma.jobDescription.findFirst({
        where: {
            id: jobDescriptionId
        }
    })
    return await JobDescriptionEntityToDTO(entity as JobDescriptionEntity)
}

export async function createJobDescription(jobDescription: JobDescriptionDTO) {
    const entity = JobDescriptionDTOtoEntity(jobDescription)
    const result = await prisma.jobDescription.create({
        data: {
            ...entity
        }
    })
    return await JobDescriptionEntityToDTO(result)
}

export async function userOwnsJobDescription(jobDescriptionId: number, userId: string) {
    const entity = await getJobDescription(jobDescriptionId)
    return entity.userId === userId
}