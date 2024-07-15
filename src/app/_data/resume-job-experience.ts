import { ResumeJobExperience as _ResumeJobExperienceEntity } from "@prisma/client";
import prisma from "../db";
import { getResumeJobExperienceSkills, ResumeJobExperienceSkills } from "./resume-job-experience-skill";
import { getResumeJobExperienceSugggestions, ResumeJobExperienceSugggestions } from "./resume-job-experience-suggestion";

export type ResumeJobExperienceEntity = _ResumeJobExperienceEntity
export type ResumeJobExperienceEntities = ResumeJobExperienceEntity[]

export type ResumeJobExperience = {
    id?: number | undefined
    jobId: number
    resumeId: number
    content: string
    skills?: ResumeJobExperienceSkills
    suggestions?: ResumeJobExperienceSugggestions
}
export type ResumeJobExperiences = ResumeJobExperience[]

export async function ResumeJobExperienceEntityToModel(entity: ResumeJobExperienceEntity) {
    const skills = await getResumeJobExperienceSkills(Number(entity.id))
    const suggestions = await getResumeJobExperienceSugggestions(Number(entity.id))
    return {
        ...entity,
        skills: skills,
        suggestions: suggestions
    }
}

export function ResumeJobExperienceModeltoEntity(model: ResumeJobExperience) {
    return {
        id: model.id,
        jobId: Number(model.id),
        resumeId: model.resumeId,
        content: model.content
    }
}

export async function getResumeJobExperience(experienceId: number) {
    const entity = await prisma.resumeJobExperience.findFirst({
        where: {
            id: experienceId
        }
    }) as ResumeJobExperienceEntity
    return ResumeJobExperienceEntityToModel(entity)
}

export async function getResumeJobExperiences(resumeId: number, jobId: number): Promise<ResumeJobExperiences> {
    const entities = await prisma.resumeJobExperience.findMany({
        where: {
            jobId: jobId,
            resumeId: resumeId
        }
    }) as ResumeJobExperienceEntities
    const result: ResumeJobExperiences = []
    for (const entity of entities) {
        result.push(await ResumeJobExperienceEntityToModel(entity))
    }
    return result
}

export async function createResumeJobExperience(experience: ResumeJobExperience): Promise<ResumeJobExperience> {
    const entity = ResumeJobExperienceModeltoEntity(experience)
    const result = await prisma.resumeJobExperience.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return await ResumeJobExperienceEntityToModel(result)
}

export async function deleteResumeJobExperience(experienceId: number) {
    await prisma.resumeJobExperience.delete({
        where: {
            id: experienceId
        }
    })
}

export async function updateResumeJobExperience(experience: ResumeJobExperience) {
    const entity = ResumeJobExperienceModeltoEntity(experience)
    const result = await prisma.resumeJobExperience.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
    return await ResumeJobExperienceEntityToModel(result)
}