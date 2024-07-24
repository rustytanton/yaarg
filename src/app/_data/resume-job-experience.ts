import { ResumeJobExperience as _ResumeJobExperienceEntity } from "@prisma/client";
import prisma from "../db";
import { ResumeJobExperienceSkill, ResumeJobExperienceSkillService } from "./resume-job-experience-skill";
import { getResumeJobExperienceSugggestions, ResumeJobExperienceSugggestions } from "./resume-job-experience-suggestion";
import { auth } from "../auth";

export type ResumeJobExperienceEntity = _ResumeJobExperienceEntity
export type ResumeJobExperienceEntities = ResumeJobExperienceEntity[]

export type ResumeJobExperience = {
    id: number
    userId: string
    jobId: number
    resumeId: number
    content: string
    skills?: ResumeJobExperienceSkill[]
    suggestions?: ResumeJobExperienceSugggestions
}
export type ResumeJobExperiences = ResumeJobExperience[]

export async function ResumeJobExperienceEntityToModel(entity: ResumeJobExperienceEntity) {
    const skillsRepo = new ResumeJobExperienceSkillService()
    const skills = await skillsRepo.getSkillsByExperienceId(Number(entity.id))
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
        jobId: Number(model.jobId),
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
    const session = await auth()
    const result = await prisma.resumeJobExperience.create({
        data: {
            ...entity,
            userId: session?.user?.id as string,
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

export async function deleteResumeJobExperiences(jobId: number) {
    await prisma.resumeJobExperience.deleteMany({
        where: {
            jobId: jobId
        }
    })
}

export async function deleteResumeJobExperiencesFromResume(jobId: number, resumeId: number) {
    await prisma.resumeJobExperience.deleteMany({
        where: {
            jobId: jobId,
            resumeId: resumeId
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

type uniqueResumeJobExperiencesResult = {
    id: string
}

export async function getUniqueResumeJobExperiences(jobId: number): Promise<ResumeJobExperiences> {
    let resultIds: uniqueResumeJobExperiencesResult[] = await prisma.$queryRaw`
        SELECT DISTINCT ON (content) id FROM "ResumeJobExperience" WHERE "jobId" = ${jobId}
    `
    const results: ResumeJobExperiences = []
    for (const resultId of resultIds) {
        results.push(await getResumeJobExperience(Number(resultId.id)))
    }
    return results
}