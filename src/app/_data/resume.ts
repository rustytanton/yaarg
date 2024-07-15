import { Resume as _ResumeEntity } from "@prisma/client"
import { getJobDescription, JobDescription } from "./job-description"
import prisma from "../db"
import { getResumeJobExperiences } from "./resume-job-experience"
import { getJobs, Jobs } from "./job"
import { getUser, User } from "./user"
import { Educations, getEducations } from "./education"
import { getResumeSummarySuggestions, ResumeSummarySuggestions } from "./resume-summary-suggestion"

export type ResumeEntity = _ResumeEntity
export type ResumeEntities = ResumeEntity[]

export type Resume = {
    id?: number | undefined
    userId: string
    employer: string
    jobs?: Jobs
    jobDescription?: JobDescription
    user?: User
    educations?: Educations
    summary: string,
    summarySuggestions?: ResumeSummarySuggestions
}
export type Resumes = Resume[]

export async function ResumeEntityToModel(entity: ResumeEntity): Promise<Resume> {
    const jd = await getJobDescription(entity.jobDescriptionId)
    const jobs = await getJobs(entity.userId)
    const user = await getUser(entity.userId)
    const educations = await getEducations(entity.userId)
    const summarySuggestions = await getResumeSummarySuggestions(entity.id)
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
        summarySuggestions: summarySuggestions
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