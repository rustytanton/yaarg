import { ResumeSummarySuggestion } from "@prisma/client"
import prisma from '../db'

export type ResumeSummarySuggestionEntity = ResumeSummarySuggestion
export type ResumeSummarySuggestionEntities = ResumeSummarySuggestionEntity[]

export type ResumeSummarySuggestionDTO = {
    id?: number,
    resumeId: number,
    suggestion: string
}
export type ResumeSummarySuggestionDTOs = ResumeSummarySuggestionDTO[]

export function ResumeSummarySuggestionDTOtoEntity(dto: ResumeSummarySuggestionDTO) {
    return dto as ResumeSummarySuggestionEntity
}

export function ResumeSummarySuggestionEntityToDTO(entity: ResumeSummarySuggestionEntity) {
    return entity as ResumeSummarySuggestionDTO
}

export async function getResumeSummarySuggestion(suggestionId: number) {
    const entity = await prisma.resumeSummarySuggestion.findFirst({
        where: {
            id: suggestionId
        }
    }) as ResumeSummarySuggestionEntity
    return ResumeSummarySuggestionEntityToDTO(entity)
}

export async function getResumeSummarySuggestions(resumeId: number) {
    const entities = await prisma.resumeSummarySuggestion.findMany({
        where: {
            resumeId: resumeId
        }
    })
    return entities.map(entity => ResumeSummarySuggestionEntityToDTO(entity))
}

export async function createResumeSummarySuggestion(suggestion: ResumeSummarySuggestionDTO) {
    const entity = ResumeSummarySuggestionDTOtoEntity(suggestion)
    const result = await prisma.resumeSummarySuggestion.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeSummarySuggestionEntityToDTO(result)
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