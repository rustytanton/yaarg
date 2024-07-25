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

// NOTE: We can't use the base mapper class on User because the ID types are incompatible
export class MapperUser {
    prismaModel: typeof prisma.user

    constructor(prismaModel: typeof prisma.user = prisma.user) {
        this.prismaModel = prismaModel
    }

    async toEntity(model: User): Promise<UserEntity> {
        const entityPrevious = await this.prismaModel.findFirst({
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

    async toModel(entity: UserEntity): Promise<User> {
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
}

// NOTE: We can't use the base repository class on User because the ID types are incompatible
export class UserRepository {
    mapper: MapperUser
    prismaModel: typeof prisma.user

    constructor(
        mapper: MapperUser = new MapperUser(),
        prismaModel: typeof prisma.user = prisma.user
    ) {
        this.mapper = mapper
        this.prismaModel = prismaModel
    }

    async get(id: string): Promise<User> {
        const user = await this.prismaModel.findFirst({
            where: {
                id: id
            }
        })
        return this.mapper.toModel(user as UserEntity)
    }

    async update(model: User) {
        const entity = await this.prismaModel.update({
            where: {
                id: model.id
            },
            data: {
                ...model
            }
        })
        return entity ? this.mapper.toModel(entity) : null
    }
}

// NOTE: We can't use the base service class on User because the ID types are incompatible
export class UserService {
    repo: UserRepository

    constructor(
        repo: UserRepository = new UserRepository()
    ) {
        this.repo = repo
    }

    async get(id: string): Promise<User | null> {
        return await this.repo.get(id)
    }

    async update(model: User): Promise<User | null> {
        return await this.repo.update(model)
    }
}