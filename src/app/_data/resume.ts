import { Resume as _ResumeEntity } from "@prisma/client"
import { JobDescription, JobDescriptionService } from "./job-description"
import prisma from "../db"
import { Job, JobService } from "./job"
import { User, UserService } from "./user"
import { Education, EducationService } from "./education"
import { ResumeSummarySuggestion, ResumeSummarySuggestionService } from "./resume-summary-suggestion"
import { ChatGptAsyncJobs, ChatGptAsyncJobService } from "./chatgpt-async-job"
import { BaseRepository, BaseService, IMapper } from "./_base"

export type ResumeEntity = _ResumeEntity

export type Resume = {
    id: number
    userId: string
    employer: string
    jobs?: Job[]
    jobDescription?: JobDescription
    user?: User
    educations?: Education[]
    summary: string,
    summarySuggestions?: ResumeSummarySuggestion[]
    chatGptAsyncJobs?: ChatGptAsyncJobs
}

export class MapperResume implements IMapper<Resume, ResumeEntity> {
    chatGptJobService: ChatGptAsyncJobService
    educationService: EducationService
    jobDescriptionService: JobDescriptionService
    jobService: JobService
    suggestionService: ResumeSummarySuggestionService
    userService: UserService
    prismaModel: typeof prisma.resume
    
    constructor(
        chatGptJobService: ChatGptAsyncJobService = new ChatGptAsyncJobService(),
        educationService: EducationService = new EducationService(),
        jobDescriptionService: JobDescriptionService = new JobDescriptionService(),
        jobService: JobService = new JobService(),
        suggestionService: ResumeSummarySuggestionService = new ResumeSummarySuggestionService(),
        userService: UserService = new UserService(),
        prismaModel: typeof prisma.resume = prisma.resume
    ) {
        this.chatGptJobService = chatGptJobService
        this.educationService = educationService
        this.jobDescriptionService = jobDescriptionService
        this.jobService = jobService
        this.suggestionService = suggestionService
        this.userService = userService
        this.prismaModel = prismaModel
    }

    async toEntity(model: Resume): Promise<ResumeEntity> {
        const entityPrevious = await this.prismaModel.findFirst({
            where: {
                id: model.id
            }
        })
        return {
            id: model.id,
            userId: model.userId,
            createdAt: entityPrevious?.createdAt as Date,
            employer: model.employer,
            jobDescriptionId: model?.jobDescription?.id || 0,
            summary: model.summary
        }
    }

    async toModel(entity: ResumeEntity): Promise<Resume> {
        return {
            id: entity.id,
            userId: entity.userId,
            employer: entity.employer,
            summary: entity.summary as string,
            jobs: await this.jobService.getAllByUserId(entity.userId) || [],
            jobDescription: await this.jobDescriptionService.get(entity.jobDescriptionId) as JobDescription,
            user: await this.userService.get(entity.userId) as User,
            educations: await this.educationService.getAllByUserId(entity.userId) || [],
            summarySuggestions: await this.suggestionService.getAllByResumeId(entity.id),
            chatGptAsyncJobs: await this.chatGptJobService.getJobsByResumeId(entity.id) || []
        }
    }
}

type userResumeCountResult = {
    count: string    
}

export class ResumeRepository extends BaseRepository<Resume, ResumeEntity, typeof prisma.resume> {
    constructor(
        mapper: MapperResume = new MapperResume(),
        prismaModel: typeof prisma.resume = prisma.resume
    ) {
        super(mapper, prismaModel)
    }

    async userResumeCount(userId: string): Promise<number> {
        const result: userResumeCountResult[] = await prisma.$queryRaw`SELECT COUNT(*) FROM "Resume" WHERE "userId" = ${userId}`
        return Number(result[0].count)
    }
}

export class ResumeService extends BaseService<Resume, ResumeEntity, typeof prisma.resume> {
    repo: ResumeRepository

    constructor(
        repo: ResumeRepository = new ResumeRepository()
    ) {
        super(repo)
        this.repo = repo
    }

    async userResumeCount(userId: string): Promise<number> {
        return await this.repo.userResumeCount(userId)
    }
}
