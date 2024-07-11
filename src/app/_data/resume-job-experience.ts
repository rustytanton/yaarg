import { ResumeJobExperience } from "@prisma/client";
import prisma from "../db";

export type ResumeJobExperienceEntity = ResumeJobExperience
export type ResumeJobExperienceEntities = ResumeJobExperienceEntity[]

export type ResumeJobExperienceDTO = {
    id?: number | undefined
    jobId: number
    resumeId: number
    content: string
}
export type ResumeJobExperienceDTOs = ResumeJobExperienceDTO[]

export function ResumeJobExperienceEntityToDTO(entity: ResumeJobExperienceEntity) {
    return entity as ResumeJobExperienceDTO
}

export function ResumeJobExperienceDTOtoEntity(dto: ResumeJobExperienceDTO) {
    return dto as ResumeJobExperienceEntity
}

export async function getResumeJobExperience(experienceId: number) {
    const entity = await prisma.resumeJobExperience.findFirst({
        where: {
            id: experienceId
        }
    }) as ResumeJobExperienceEntity
    return ResumeJobExperienceEntityToDTO(entity)
}

export async function getResumeJobExperiences(resumeId: number, jobId: number): Promise<ResumeJobExperienceDTOs> {
    const entities = await prisma.resumeJobExperience.findMany({
        where: {
            jobId: jobId,
            resumeId: resumeId
        }
    }) as ResumeJobExperienceEntities
    return entities.map(entity => ResumeJobExperienceEntityToDTO(entity))
}

export async function createResumeJobExperience(experience: ResumeJobExperienceDTO): Promise<ResumeJobExperienceDTO> {
    const entity = ResumeJobExperienceDTOtoEntity(experience)
    const result = await prisma.resumeJobExperience.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeJobExperienceEntityToDTO(result)
}