import { ResumeSummarySuggestion as _ResumeSummarySuggestionEntity } from "@prisma/client"
import prisma from '../db'

export type ResumeSummarySuggestionEntity = _ResumeSummarySuggestionEntity
export type ResumeSummarySuggestionEntities = ResumeSummarySuggestionEntity[]

export type ResumeSummarySuggestion = {
    id?: number,
    resumeId: number,
    suggestion: string
}
export type ResumeSummarySuggestions = ResumeSummarySuggestion[]

export function ResumeSummarySuggestionModeltoEntity(model: ResumeSummarySuggestion) {
    return model as ResumeSummarySuggestionEntity
}

export function ResumeSummarySuggestionEntityToModel(entity: ResumeSummarySuggestionEntity) {
    return entity as ResumeSummarySuggestion
}

export async function getResumeSummarySuggestion(suggestionId: number) {
    const entity = await prisma.resumeSummarySuggestion.findFirst({
        where: {
            id: suggestionId
        }
    }) as ResumeSummarySuggestionEntity
    return ResumeSummarySuggestionEntityToModel(entity)
}

export async function getResumeSummarySuggestions(resumeId: number) {
    const entities = await prisma.resumeSummarySuggestion.findMany({
        where: {
            resumeId: resumeId
        }
    })
    return entities.map(entity => ResumeSummarySuggestionEntityToModel(entity))
}

export async function createResumeSummarySuggestion(suggestion: ResumeSummarySuggestion) {
    const entity = ResumeSummarySuggestionModeltoEntity(suggestion)
    const result = await prisma.resumeSummarySuggestion.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeSummarySuggestionEntityToModel(result)
}

export async function deleteResumeSummarySuggestion(suggestionId: number) {
    await prisma.resumeSummarySuggestion.delete({
        where: {
            id: suggestionId
        }
    })
}

export async function deleteResumeSummarySuggestions(resumeId: number) {
    await prisma.resumeSummarySuggestion.deleteMany({
        where: {
            resumeId: resumeId
        }
    })
}