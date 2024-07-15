'use server'

import { ResumeJobFormState } from "./types";
import { deleteIds, fieldGroups } from "@/app/_lib/util/form";
import {
    ResumeJobExperience,
    ResumeJobExperiences,
    deleteResumeJobExperience,
    updateResumeJobExperience,
    createResumeJobExperience
} from "@/app/_data/resume-job-experience";
import { userOwnsResume } from "@/app/_data/resume";
import { auth } from "@/app/auth";

export async function handleFormChange(prevState: ResumeJobFormState, formData: FormData) {
    if (formData.get('addExperience') === 'true') {
        const experiences = prevState?.experiences || []
        experiences.push({} as ResumeJobExperience)
        return {
            ...prevState,
            addExperience: false,
            experiences: experiences
        }
    } else {
        const deletes = deleteIds(formData)
        const experiences: ResumeJobExperiences = []
        const groups = fieldGroups(formData, 'experience')
        const jobId = Number(formData.get('jobId'))
        const resumeId = Number(formData.get('resumeId'))
        const messages: string[] = []
        const session = await auth()
        
        if (!session?.user || !await userOwnsResume(resumeId, session.user.id as string)) {
            throw new Error('Current user does not have access to edit this resume')
        }

        for (const deleteId of deletes) {
            await deleteResumeJobExperience(deleteId)
            messages.push('Deleted ' + deleteId)
        }
        
        for (const group of groups) {
            const content = formData.get(group + 'content') as string
            const experienceId = Number(formData.get(group + 'content_contentId')) 
            if (experienceId) {
                const experience = await updateResumeJobExperience({
                    id: experienceId,
                    jobId: jobId,
                    resumeId: resumeId,
                    content: content
                })
                experiences.push(experience)
                messages.push('Updated ' + experience.id.toString())
            } else {
                const experience = await createResumeJobExperience({
                    jobId: jobId,
                    resumeId: resumeId,
                    content: content
                })
                experiences.push(experience)
                messages.push('Created ' + experience.id as string)
            }
        }

        return {
            ...prevState,
            experiences: experiences,
            message: messages.join('. ')
        }
    }
}