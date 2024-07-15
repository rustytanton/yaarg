import { User as _UserEntity } from '@prisma/client'
import prisma from '../db'


type UserEntity = _UserEntity

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    emailAlt: string,
    github: string,
    linkedIn: string,
    location: string,
    phoneNumber: string,
    website: string
}

export function UserEntityToModel(entity: UserEntity): User {
    return {
        id: entity.id,
        firstName: entity.firstName as string,
        lastName: entity.lastName as string,
        email: entity.email as string,
        emailAlt: entity.emailAlt as string,
        github: entity.github as string,
        linkedIn: entity.linkedIn as string,
        location: entity.location as string,
        phoneNumber: entity.phoneNumber as string,
        website: entity.website as string
    }
}

export async function UserModelToEntity(model: User): Promise<UserEntity> {
    const entityPrevious = await prisma.user.findFirst({
        where: {
            id: model.id
        }
    })
    return {
        id: model.id,
        name: model.firstName + ' ' + model.lastName,
        firstName: model.firstName,
        lastName: model.lastName,
        createdAt: entityPrevious?.createdAt as Date,
        updatedAt: new Date(),
        email: entityPrevious?.email as string,
        emailAlt: model.emailAlt,
        emailVerified: entityPrevious?.emailVerified || null,
        github: model.github,
        image: entityPrevious?.image as string,
        linkedIn: model.linkedIn,
        location: model.location,
        phoneNumber: model.phoneNumber,   
        website: model.website
    }
}

export async function getUser(userId: string) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    return UserEntityToModel(user as UserEntity)
}

export async function updateUser(user: User) {
    const entity = await UserModelToEntity(user)
    await prisma.user.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
}