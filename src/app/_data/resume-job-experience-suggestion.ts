import { ResumeJobExperienceSugggestion } from "@prisma/client";
import prisma from "../db";

export type ResumeJobExperienceSugggestionEntity = ResumeJobExperienceSugggestion
export type ResumeJobExperienceSugggestionEntities = ResumeJobExperienceSugggestionEntity[]

export type ResumeJobExperienceSugggestionDTO = {
    id?: number
    jobExperienceId: number
    suggestion: string
}
export type ResumeJobExperienceSugggestionDTOs = ResumeJobExperienceSugggestionDTO[]

export function ResumeJobExperienceSugggestionDTOtoEntity(
    dto: ResumeJobExperienceSugggestionDTO
): ResumeJobExperienceSugggestionEntity {
    return dto as ResumeJobExperienceSugggestionEntity
}

export function ResumeJobExperienceSugggestionEntityToDTO(
    entity: ResumeJobExperienceSugggestionEntity
): ResumeJobExperienceSugggestionDTO {
    return entity as ResumeJobExperienceSugggestionDTO
}

export async function getResumeJobExperienceSugggestion(suggestionId: number) {
    const result = await prisma.resumeJobExperienceSugggestion.findFirst({
        where: {
            id: suggestionId
        }
    }) as ResumeJobExperienceSugggestionEntity
    return ResumeJobExperienceSugggestionEntityToDTO(result)
}

export async function getResumeJobExperienceSugggestions(experienceId: number) {
    const result = await prisma.resumeJobExperienceSugggestion.findMany({
        where: {
            jobExperienceId: experienceId
        }
    }) as ResumeJobExperienceSugggestionEntities
    return result.map(suggestion => ResumeJobExperienceSugggestionEntityToDTO(suggestion))
}

export async function createResumeJobExperienceSugggestion(
    suggestion: ResumeJobExperienceSugggestionDTO
) {
    const entity = ResumeJobExperienceSugggestionDTOtoEntity(suggestion)
    const result = await prisma.resumeJobExperienceSugggestion.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeJobExperienceSugggestionEntityToDTO(result)
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