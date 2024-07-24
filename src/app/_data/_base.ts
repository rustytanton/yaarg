export type BaseModel = {
    id: number
    userId: string
}

export type BaseEntity = {
    id: number
    userId: string
}

export interface IMapper<Model extends BaseModel, Entity extends BaseEntity> {
    toEntity(model: Model): Promise<Entity>
    toModel(entity: Entity): Promise<Model>
}

export interface IService<Model extends BaseModel, Entity extends BaseEntity, PrismaModel extends PrismaFootprint<Entity>> {
    repo: IRepository<Model, Entity, PrismaModel>
    get(id: number): Promise<Model | null>
    getAll(): Promise<Model[] | null>
    getAllByUserId(userId: string): Promise<Model[] | null>
    create(model: Model): Promise<Model | null>
    update(model: Model): Promise<Model | null>
    delete(id: number): Promise<void>
    userOwnsItem(userId: string, itemId: number): Promise<boolean>
}

export interface IRepository<Model extends BaseModel, Entity extends BaseEntity, PrismaModel extends PrismaFootprint<Entity>> {
    mapper: IMapper<Model, Entity>
    prismaModel: PrismaModel
    get(id: number): Promise<Model | null>
    getAll(): Promise<Model[] | null>
    getAllByUserId(userId: string): Promise<Model[] | null>
    create(model: Model): Promise<Model | null>
    update(model: Model): Promise<Model | null>
    delete(id: number): Promise<void>
}

export interface IFindFirstArgs {
    where: {
        id: number
    }
}

export interface IFindAllArgs {
    where?: {
        userId?: string
    }
}

export interface ICreateArgs {
    data: any
}

export interface IUpdateArgs {
    where: {
        id: number
    }
    data: any
}

export interface IDeleteArgs {
    where: {
        id: number
    }
}

export type PrismaFootprint<Entity> = {
    findFirst(args: IFindFirstArgs): Promise<Entity | null>
    findMany(args?: IFindAllArgs): Promise<Entity[] | null>
    create(args: ICreateArgs): Promise<Entity | null>
    update(args: IUpdateArgs): Promise<Entity | null>
    delete(args: IDeleteArgs): Promise<Entity | null>
}

export abstract class BaseRepository<Model extends BaseModel, Entity extends BaseEntity, PrismaModel extends PrismaFootprint<Entity>> implements IRepository<Model, Entity, PrismaModel> {
    mapper: IMapper<Model, Entity>
    prismaModel: PrismaModel

    constructor(mapper: IMapper<Model, Entity>, prismaModel: PrismaModel) {
        this.mapper = mapper
        this.prismaModel = prismaModel
    }

    async get(id: number): Promise<Model | null> {
        const entity = await this.prismaModel.findFirst({
            where: {
                id: id
            }
        })
        return entity ? this.mapper.toModel(entity) : null        
    }

    async getAll(): Promise<Model[] | null> {
        const entities = await this.prismaModel.findMany()
        if (entities) {
            const result: Model[] = []
            for (const entity of entities) {
                result.push(await this.mapper.toModel(entity))
            }
            return result
        } else {
            return null
        }
    }

    async getAllByUserId(userId: string): Promise<Model[] | null> {
        const entities = await this.prismaModel.findMany({
            where: {
                userId: userId
            }
        })
        if (entities) {
            const result: Model[] = []
            for (const entity of entities) {
                result.push(await this.mapper.toModel(entity))
            }
            return result
        } else {
            return null
        }
    }

    async create(model: Model): Promise<Model | null> {
        const entity = await this.prismaModel.create({
            data: {
                ...model
            }
        })
        return entity ? this.mapper.toModel(entity) : null
    }

    async update(model: Model): Promise<Model | null> {
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

    async delete(id: number): Promise<void> {
        await this.prismaModel.delete({
            where: {
                id: id
            }
        })
    }

}

export abstract class BaseService<
    Model extends BaseModel,
    Entity extends BaseEntity,
    PrismaModel extends PrismaFootprint<Entity>
> implements IService<Model, Entity, PrismaModel> {
    repo: IRepository<Model, Entity, PrismaModel>
    
    constructor(repo: IRepository<Model, Entity, PrismaModel>) {
        this.repo = repo
    }
    
    async get(id: number): Promise<Model | null> {
        return await this.repo.get(id)
    }

    async getAll(): Promise<Model[] | null> {
        return await this.repo.getAll()
    }

    async getAllByUserId(userId: string): Promise<Model[] | null> {
        return await this.repo.getAllByUserId(userId)
    }

    async create(model: Model): Promise<Model | null> {
        return await this.repo.create({
            ...model,
            id: undefined
        })
    }

    async update(model: Model): Promise<Model | null> {
        return await this.repo.update(model)
    }

    async delete(id: number): Promise<void> {
        return await this.repo.delete(id)
    }

    async userOwnsItem(userId: string, itemId: number): Promise<boolean> {
        const item = await this.repo.get(itemId)
        return item?.userId === userId
    }
}

