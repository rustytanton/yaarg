import { User } from '@prisma/client'
import prisma from '../db'


type UserEntity = User

export type UserDTO = {
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

export function UserEntityToDTO(entity: UserEntity): UserDTO {
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

export async function UserDTOToEntity(dto: UserDTO): Promise<UserEntity> {
    const entityPrevious = await prisma.user.findFirst({
        where: {
            id: dto.id
        }
    })
    return {
        id: dto.id,
        name: dto.firstName + ' ' + dto.lastName,
        firstName: dto.firstName,
        lastName: dto.lastName,
        createdAt: entityPrevious?.createdAt as Date,
        updatedAt: new Date(),
        email: entityPrevious?.email as string,
        emailAlt: dto.emailAlt,
        emailVerified: entityPrevious?.emailVerified || null,
        github: dto.github,
        image: entityPrevious?.image as string,
        linkedIn: dto.linkedIn,
        location: dto.location,
        phoneNumber: dto.phoneNumber,   
        website: dto.website
    }
}

export async function getUser(userId: string) {
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    return UserEntityToDTO(user as UserEntity)
}

export async function updateUser(user: UserDTO) {
    const entity = await UserDTOToEntity(user)
    await prisma.user.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
}