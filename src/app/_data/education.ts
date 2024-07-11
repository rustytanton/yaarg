import { Education } from "@prisma/client"
import prisma from "../db"

export type EducationEntity = Education
export type EducationEntities = EducationEntity[]

export type EducationDTO = {
    id?: number
    userId: string
    institution?: string
    major?: string
    minor?: string
    startDate?: string
    endDate?: string
    graduated?: boolean
    gpa?: string
}
export type EducationDTOs = EducationDTO[]

export function EducationDTOtoEntity(dto: EducationDTO): EducationEntity {
    return dto as EducationEntity
}

export function EducationEntityToDTO(entity: EducationEntity): EducationDTO {
    return entity as EducationDTO
}

export async function getEducation(educationId: number): Promise<EducationDTO> {
    const entity = await prisma.education.findFirst({
        where: {
            id: educationId
        }
    }) as EducationEntity
    return EducationEntityToDTO(entity)
}

export async function getEducations(userId: string): Promise<EducationDTOs> {
    const entities = await prisma.education.findMany({
        where: {
            userId: userId
        }
    }) as EducationEntities
    return entities.map(entity => EducationEntityToDTO(entity))
}

export async function createEducation(education: EducationDTO): Promise<EducationDTO> {
    const entity = EducationDTOtoEntity(education)
    const result = await prisma.education.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return EducationEntityToDTO(result)
}

export async function updateEducation(education: EducationDTO): Promise<EducationDTO> {
    const entity = EducationDTOtoEntity(education)
    const result = await prisma.education.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
    return EducationEntityToDTO(result)
}

export async function deleteEducation(educationId: number) {
    await prisma.education.delete({
        where: {
            id: educationId
        }
    })
}

export async function userOwnsEducation(userId: string, educationId: number) {
    const education = await getEducation(educationId)
    return userId === education.userId
}