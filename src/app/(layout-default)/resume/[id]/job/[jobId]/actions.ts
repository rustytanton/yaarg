'use server'

import { ResumeJobFormState } from "./types";
import prisma from "@/app/db";
import { deleteIds, fieldGroups } from "@/app/_lib/util/form";
import { ResumeJobExperienceDTO, ResumeJobExperienceDTOs } from "@/app/_data/resume-job-experience";

export async function handleFormChange(prevState: ResumeJobFormState, formData: FormData) {
    if (formData.get('addExperience') === 'true') {
        const experiences = prevState?.experiences || []
        experiences.push({} as ResumeJobExperienceDTO)
        return {
            ...prevState,
            addExperience: false,
            experiences: experiences
        }
    } else {
        const deletes = deleteIds(formData)
        const experiences: ResumeJobExperienceDTOs = []
        const groups = fieldGroups(formData, 'experience')
        const jobId = Number(formData.get('jobId'))
        const resumeId = Number(formData.get('resumeId'))
        const messages: string[] = []
        
        for (const deleteId of deletes) {
            await prisma.resumeJobExperience.delete({
                where: {
                    id: deleteId
                }
            })
            messages.push('Deleted ' + deleteId)
        }
        
        for (const group of groups) {
            const content = formData.get(group + 'content') as string
            const experienceId = Number(formData.get(group + 'content_contentId')) 
            if (experienceId) {
                const experience = await prisma.resumeJobExperience.update({
                    where: { id: experienceId },
                    data: {
                        jobId: jobId,
                        resumeId: resumeId,
                        content: content
                    }
                })
                experiences.push(experience)
                messages.push('Updated ' + experience.id.toString())
            } else {
                const experience = await prisma.resumeJobExperience.create({
                    data: {
                        jobId: jobId,
                        resumeId: resumeId,
                        content: content
                    }
                })
                experiences.push(experience)
                messages.push('Created ' + experience.id.toString())
            }
        }

        return {
            ...prevState,
            experiences: experiences,
            message: messages.join('. ')
        }
    }
}