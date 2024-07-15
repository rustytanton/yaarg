import { Education as _EducationEntity } from "@prisma/client"
import prisma from "../db"

export type EducationEntity = _EducationEntity
export type EducationEntities = EducationEntity[]

export type Education = {
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
export type Educations = Education[]

export function EducationModeltoEntity(model: Education): EducationEntity {
    return model as EducationEntity
}

export function EducationEntityToModel(entity: EducationEntity): Education {
    return entity as Education
}

export async function getEducation(educationId: number): Promise<Education> {
    const entity = await prisma.education.findFirst({
        where: {
            id: educationId
        }
    }) as EducationEntity
    return EducationEntityToModel(entity)
}

export async function getEducations(userId: string): Promise<Educations> {
    const entities = await prisma.education.findMany({
        where: {
            userId: userId
        }
    }) as EducationEntities
    return entities.map(entity => EducationEntityToModel(entity))
}

export async function createEducation(education: Education): Promise<Education> {
    const entity = EducationModeltoEntity(education)
    const result = await prisma.education.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return EducationEntityToModel(result)
}

export async function updateEducation(education: Education): Promise<Education> {
    const entity = EducationModeltoEntity(education)
    const result = await prisma.education.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
    return EducationEntityToModel(result)
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