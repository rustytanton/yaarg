import { ResumeJobExperience } from "@prisma/client";
import prisma from "../db";
import { getResumeJobExperienceSkills, ResumeJobExperienceSkillDTOs } from "./resume-job-experience-skill";
import { getResumeJobExperienceSugggestions, ResumeJobExperienceSugggestionDTOs } from "./resume-job-experience-suggestion";

export type ResumeJobExperienceEntity = ResumeJobExperience
export type ResumeJobExperienceEntities = ResumeJobExperienceEntity[]

export type ResumeJobExperienceDTO = {
    id?: number | undefined
    jobId: number
    resumeId: number
    content: string
    skills?: ResumeJobExperienceSkillDTOs
    suggestions?: ResumeJobExperienceSugggestionDTOs
}
export type ResumeJobExperienceDTOs = ResumeJobExperienceDTO[]

export async function ResumeJobExperienceEntityToDTO(entity: ResumeJobExperienceEntity) {
    const skills = await getResumeJobExperienceSkills(Number(entity.id))
    const suggestions = await getResumeJobExperienceSugggestions(Number(entity.id))
    return {
        ...entity,
        skills: skills,
        suggestions: suggestions
    }
}

export function ResumeJobExperienceDTOtoEntity(dto: ResumeJobExperienceDTO) {
    return {
        id: dto.id,
        jobId: Number(dto.id),
        resumeId: dto.resumeId,
        content: dto.content
    }
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
    const result: ResumeJobExperienceDTOs = []
    for (const entity of entities) {
        result.push(await ResumeJobExperienceEntityToDTO(entity))
    }
    return result
}

export async function createResumeJobExperience(experience: ResumeJobExperienceDTO): Promise<ResumeJobExperienceDTO> {
    const entity = ResumeJobExperienceDTOtoEntity(experience)
    const result = await prisma.resumeJobExperience.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return await ResumeJobExperienceEntityToDTO(result)
}

export async function deleteResumeJobExperience(experienceId: number) {
    await prisma.resumeJobExperience.delete({
        where: {
            id: experienceId
        }
    })
}

export async function updateResumeJobExperience(experience: ResumeJobExperienceDTO) {
    const entity = ResumeJobExperienceDTOtoEntity(experience)
    const result = await prisma.resumeJobExperience.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
    return await ResumeJobExperienceEntityToDTO(result)
}