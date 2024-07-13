'use server'

import { ChatGptSuggestionsrPromptBullet, getBulletAnalysis } from "@/app/_lib/chatgpt/assistant-suggestions"
import { ResumeFormState } from "./types"
import { createResumeJobExperienceSkill, deleteResumeJobExperienceSkills } from "@/app/_data/resume-job-experience-skill"
import { deleteResumeSummarySuggestions, createResumeSummarySuggestion } from "@/app/_data/resume-summary-suggestion"
import { revalidatePath } from "next/cache"
import { createResumeJobExperienceSugggestion, deleteResumeJobExperienceSuggestions } from "@/app/_data/resume-job-experience-suggestion"
import { ResumeDTO, updateResume, userOwnsResume } from "@/app/_data/resume"
import { auth } from "@/app/auth"

export async function handleFormChange(prevState: ResumeFormState, formData: FormData) {
    const loadSuggestions = formData.get('suggestions')
    const summary = formData.get('summary') as string

    const session = await auth()

    if (await !userOwnsResume(Number(prevState.resume?.id), session?.user?.id as string)) {
        throw new Error('User does not own resume, cannot make edits')
    }

    if (summary && session && session.user && loadSuggestions !== 'true') {
        await updateResume({
            ...prevState.resume,
            userId: prevState.resume?.userId as string,
            employer: prevState.resume?.employer as string,
            summary: summary
        })

        return {
            ...prevState,
            loadSuggestions: false,
            resume: {
                ...prevState.resume,
                summary: summary
            } as ResumeDTO
        }
    }

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
            summary: prevState.resume?.summary,
            skills: skills,
            bullets: bullets
        }))

        for (const suggestion of Array.from(suggestions.result)) {
            await deleteResumeJobExperienceSkills(suggestion.bulletId)
            for (const skill of suggestion.skillsUsed) {
                await createResumeJobExperienceSkill({
                    jobExperienceId: suggestion.bulletId,
                    skill: skill
                })
            }

            await deleteResumeJobExperienceSuggestions(suggestion.bulletId)
            for (const item of suggestion.qualitySuggestions) {
                await createResumeJobExperienceSugggestion({
                    jobExperienceId: suggestion.bulletId,
                    suggestion: item
                })
            }
        }

        await deleteResumeSummarySuggestions(Number(prevState.resume.id))
        for (const summarySuggestion of suggestions.summaryQualitySuggestions) {
            await createResumeSummarySuggestion({
                resumeId: Number(prevState.resume.id),
                suggestion: summarySuggestion
            })
        }

        revalidatePath('/resume/' + prevState.resume.id)
    }
    return {
        ...prevState,
        loadSuggestions: false
    }
}