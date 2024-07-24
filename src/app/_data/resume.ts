import { Resume as _ResumeEntity } from "@prisma/client"
import { JobDescription, JobDescriptionService } from "./job-description"
import prisma from "../db"
import { getResumeJobExperiences } from "./resume-job-experience"
import { getJobs, Jobs } from "./job"
import { getUser, User } from "./user"
import { Education, EducationService } from "./education"
import { getResumeSummarySuggestions, ResumeSummarySuggestions } from "./resume-summary-suggestion"
import { ChatGptAsyncJobs, ChatGptAsyncJobService } from "./chatgpt-async-job"

export type ResumeEntity = _ResumeEntity
export type ResumeEntities = ResumeEntity[]

export type Resume = {
    id?: number | undefined
    userId: string
    employer: string
    jobs?: Jobs
    jobDescription?: JobDescription
    user?: User
    educations?: Education[]
    summary: string,
    summarySuggestions?: ResumeSummarySuggestions
    chatGptAsyncJobs?: ChatGptAsyncJobs
}
export type Resumes = Resume[]

export async function ResumeEntityToModel(entity: ResumeEntity): Promise<Resume> {
    const jdService = new JobDescriptionService()
    const jd = await jdService.get(entity.jobDescriptionId) as JobDescription
    const jobs = await getJobs(entity.userId)
    const user = await getUser(entity.userId)
    const educationService = new EducationService()
    const educations = await educationService.getAllByUserId(entity.userId) as Education[]
    const summarySuggestions = await getResumeSummarySuggestions(entity.id)
    const chatGptJobService = new ChatGptAsyncJobService()
    const chatGptAsyncJobs = await chatGptJobService.getJobsByResumeId(entity.id)
    for (let i = 0; i < jobs.length; i++) {
        jobs[i].experiences = await getResumeJobExperiences(entity.id, Number(jobs[i].id)) || []
    }
    return {
        id: entity.id,
        userId: entity.userId,
        employer: entity.employer,
        summary: entity.summary as string,
        jobs: jobs,
        jobDescription: jd,
        user: user,
        educations: educations,
        summarySuggestions: summarySuggestions,
        chatGptAsyncJobs: chatGptAsyncJobs || []
    }
}

export async function ResumeModeltoEntity(model: Resume): Promise<ResumeEntity> {
    const entityPrevious = await prisma.resume.findFirst({
        where: {
            id: model.id
        }
    })
    return {
        id: model.id || 0,
        userId: model.userId,
        createdAt: entityPrevious?.createdAt as Date,
        employer: model.employer,
        jobDescriptionId: model?.jobDescription?.id || 0,
        summary: model.summary
    }
}

export async function getResume(resumeId: number) {
    const entity = await prisma.resume.findFirst({
        where: {
            id: resumeId
        }
    })
    return await ResumeEntityToModel(entity as ResumeEntity)
}

export async function getResumes(userId: string): Promise<Resumes> {
    const entities = await prisma.resume.findMany({
        where: {
            userId: userId
        }
    })
    const resumes: Resumes = []
    for (const entity of entities) {
        resumes.push(await ResumeEntityToModel(entity))
    }
    return resumes
}

export async function createResume(resume: Resume) {
    const entity = await ResumeModeltoEntity(resume)
    const result = await prisma.resume.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeEntityToModel(result)
}

export async function updateResume(resume: Resume) {
    const entity = await ResumeModeltoEntity(resume)
    await prisma.resume.update({
        where: {
            id: entity.id
        },
        data: {
            ...entity
        }
    })
}

export async function deleteResume(resumeId: number) {
    await prisma.resume.delete({
        where: {
            id: resumeId
        }
    })
}

export async function userOwnsResume(resumeId: number, userId: string) {
    const entity = await getResume(resumeId)
    return entity?.userId === userId
}

type userResumeCountResult = {
    count: string    
}

export async function userResumeCount(userId: string): Promise<number> {
    const result: userResumeCountResult[] = await prisma.$queryRaw`SELECT COUNT(*) FROM "Resume" WHERE "userId" = ${userId}`
    return Number(result[0].count)
}
