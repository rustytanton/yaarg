'use server'

import { ResumeJobFormState, ResumeJobFormStatuses } from "./types";
import { deleteIds, fieldGroups } from "@/app/_lib/util/form";
import { ResumeJobExperience, ResumeJobExperienceService } from "@/app/_data/resume-job-experience";
import { ResumeService } from "@/app/_data/resume";
import { auth } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { ResumeJobExperienceSugggestionService } from "@/app/_data/resume-job-experience-suggestion";

export async function handleFormChange(prevState: ResumeJobFormState, formData: FormData) {
    if (formData.get('addExperience') === 'true') {
        const experiences = prevState?.experiences || []
        experiences.push({} as ResumeJobExperience)
        return {
            ...prevState,
            addExperience: false,
            experiences: experiences,
            message: 'Experience added',
            status: ResumeJobFormStatuses.SUCCESS,
            statusUpdated: new Date()
        }
    } else {
        const deletes = deleteIds(formData)
        const experiences: ResumeJobExperience[] = []
        const groups = fieldGroups(formData, 'experience')
        const jobId = Number(formData.get('jobId'))
        const resumeId = Number(formData.get('resumeId'))
        const session = await auth()
        const jeSuggestionService = new ResumeJobExperienceSugggestionService()
        const jeService = new ResumeJobExperienceService()
        const resumeService = new ResumeService()
        
        if (!session?.user || !await resumeService.userOwnsItem(session.user.id as string, resumeId)) {
            throw new Error('Current user does not have access to edit this resume')
        }

        for (const deleteId of deletes) {
            await jeService.delete(deleteId)
        }
        
        for (const group of groups) {
            const content = formData.get(group + 'content') as string
            const experienceId = Number(formData.get(group + 'content_contentId')) 
            if (experienceId) {
                const experiencePrevious = await jeService.get(experienceId) as ResumeJobExperience
                if (experiencePrevious.content !== content) {
                    const experience = await jeService.update({
                        id: experienceId,
                        userId: session.user.id as string,
                        jobId: jobId,
                        resumeId: resumeId,
                        content: content
                    }) as ResumeJobExperience
                    await jeSuggestionService.delete(experienceId)
                    experiences.push(experience)
                }                
            } else {
                const experience = await jeService.create({
                    id: 0,
                    jobId: jobId,
                    userId: session.user.id as string,
                    resumeId: resumeId,
                    content: content
                }) as ResumeJobExperience
                experiences.push(experience)
            }
        }

        revalidatePath('/resume/' + Number(resumeId))

        return {
            ...prevState,
            experiences: experiences,
            message: 'Job experience updated',
            status: ResumeJobFormStatuses.SUCCESS,
            statusUpdated: new Date()
        }
    }
}