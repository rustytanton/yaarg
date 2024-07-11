import { Resume } from "@prisma/client"
import { getJobDescription, JobDescriptionDTO } from "./job-description"
import prisma from "../db"
import { getResumeJobExperiences, ResumeJobExperienceDTOs } from "./resume-job-experience"
import { getJobs, JobDTOs } from "./job"

export type ResumeEntity = Resume

export type ResumeDTO = {
    id?: number | undefined
    userId: string
    employer: string
    jobs?: JobDTOs
    jobDescription?: JobDescriptionDTO
}

export async function ResumeEntityToDTO(entity: ResumeEntity): Promise<ResumeDTO> {
    const jd = await getJobDescription(entity.jobDescriptionId)
    const jobs = await getJobs(entity.userId)
    for (let i = 0; i < jobs.length; i++) {
        jobs[i].experiences = await getResumeJobExperiences(entity.id, Number(jobs[i].id)) || []
    }
    return {
        id: entity.id,
        userId: entity.userId,
        employer: entity.employer,
        jobs: jobs,
        jobDescription: jd
    }
}

export async function ResumeDTOtoEntity(dto: ResumeDTO): Promise<ResumeEntity> {
    const entityPrevious = await prisma.resume.findFirst({
        where: {
            id: dto.id
        }
    })
    return {
        id: dto.id || 0,
        userId: dto.userId,
        createdAt: entityPrevious?.createdAt as Date,
        employer: dto.employer,
        jobDescriptionId: dto?.jobDescription?.id || 0
    }
}

export async function getResume(resumeId: number) {
    const entity = await prisma.resume.findFirst({
        where: {
            id: resumeId
        }
    })
    return ResumeEntityToDTO(entity as ResumeEntity)
}

export async function createResume(resume: ResumeDTO) {
    const entity = await ResumeDTOtoEntity(resume)
    const result = await prisma.resume.create({
        data: {
            ...entity,
            id: undefined
        }
    })
    return ResumeEntityToDTO(result)
}

export async function updateResume(resume: ResumeDTO) {
    const entity = await ResumeDTOtoEntity(resume)
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