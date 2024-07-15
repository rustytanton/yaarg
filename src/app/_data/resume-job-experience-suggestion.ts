import { ResumeJobExperienceSugggestion as _ResumeJobExperienceSugggestionEntity } from "@prisma/client";
import prisma from "../db";

export type ResumeJobExperienceSugggestionEntity = _ResumeJobExperienceSugggestionEntity
export type ResumeJobExperienceSugggestionEntities = ResumeJobExperienceSugggestionEntity[]

export type ResumeJobExperienceSugggestion = {
    id?: number
    jobExperienceId: number
    suggestion: string
}
export type ResumeJobExperienceSugggestions = ResumeJobExperienceSugggestion[]

export function ResumeJobExperienceSugggestionModeltoEntity(
    model: ResumeJobExperienceSugggestion
): ResumeJobExperienceSugggestionEntity {
    return model as ResumeJobExperienceSugggestionEntity
}

export function ResumeJobExperienceSugggestionEntityToModel(
    entity: ResumeJobExperienceSugggestionEntity
): ResumeJobExperienceSugggestion {
    return entity as ResumeJobExperienceSugggestion
}

export async function getResumeJobExperienceSugggestion(suggestionId: number) {
    const result = await prisma.resumeJobExperienceSugggestion.findFirst({
        where: {
            id: suggestionId
        }
    }) as ResumeJobExperienceSugggestionEntity
    return ResumeJobExperienceSugggestionEntityToModel(result)
}

export async function getResumeJobExperienceSugggestions(experienceId: number) {
    const result = await prisma.resumeJobExperienceSugggestion.findMany({
        where: {
            jobExperienceId: experienceId
        }
    }) as ResumeJobExperienceSugggestionEntities
    return result.map(suggestion => ResumeJobExperienceSugggestionEntityToModel(suggestion))
}

export async function createResumeJobExperienceSugggestion(
    suggestion: ResumeJobExperienceSugggestion
) {
    const entity = ResumeJobExperienceSugggestionModeltoEntity(suggestion)
    const result = await prisma.resumeJobExperienceSugggestion.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeJobExperienceSugggestionEntityToModel(result)
}

export async function deleteResumeJobExperienceSuggestion(suggestionId: number) {
    await prisma.resumeJobExperienceSugggestion.delete({
        where: {
            id: suggestionId
        }
    })
}

export async function deleteResumeJobExperienceSuggestions(experienceId: number) {
    await prisma.resumeJobExperienceSugggestion.deleteMany({
        where: {
            jobExperienceId: experienceId
        }
    })
}