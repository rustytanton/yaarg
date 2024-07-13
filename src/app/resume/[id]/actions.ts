'use server'

import { ChatGptSuggestionsrPromptBullet, getBulletAnalysis } from "@/app/_lib/chatgpt/assistant-suggestions"
import { ResumeFormState } from "./types"
import { createResumeJobExperienceSkill, deleteResumeJobExperienceSkills } from "@/app/_data/resume-job-experience-skill"
import { revalidatePath } from "next/cache"

export async function handleFormChange(prevState: ResumeFormState, formData: FormData) {
    const loadSuggestions = formData.get('suggestions')

    if (loadSuggestions === 'true' && prevState.resume?.jobs) {
        const bullets: ChatGptSuggestionsrPromptBullet[] = []
        const skills: string[] = prevState.resume?.jobDescription?.skills?.map(skill => skill.skill) || []
        for (const job of prevState.resume?.jobs) {
            if (job.experiences) {
                for (const experience of job.experiences) {
                    bullets.push({
                        bulletId: Number(experience.id),
                        bulletText: experience.content
                    })
                }
            }
        }
        const suggestions = await getBulletAnalysis(JSON.stringify({
            skills: skills,
            bullets: bullets
        }))

        for (const suggestion of suggestions) {
            await deleteResumeJobExperienceSkills(suggestion.bulletId)
            for (const skill of suggestion.skillsUsed) {
                await createResumeJobExperienceSkill({
                    jobExperienceId: suggestion.bulletId,
                    skill: skill
                })
            }
        }

        revalidatePath('/resume/' + prevState.resume.id)
    }
    
    return {
        ...prevState,
        loadSuggestions: false
    }
}