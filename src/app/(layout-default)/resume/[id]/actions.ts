'use server'

import { ChatGptSuggestionsrPromptBullet, getBulletAnalysis } from "@/app/_lib/chatgpt/assistant-suggestions"
import { ResumeFormState } from "./types"
import { createResumeJobExperienceSkill, deleteResumeJobExperienceSkills } from "@/app/_data/resume-job-experience-skill"
import { deleteResumeSummarySuggestions, createResumeSummarySuggestion } from "@/app/_data/resume-summary-suggestion"
import { revalidatePath } from "next/cache"
import { createResumeJobExperienceSugggestion, deleteResumeJobExperienceSuggestions } from "@/app/_data/resume-job-experience-suggestion"
import { getResume, updateResume, userOwnsResume } from "@/app/_data/resume"
import { auth } from "@/app/auth"
import { resetJobDescriptionSkillsUsedField, setJobDescriptionSkillUsedBySkillName } from "@/app/_data/job-description-skill"
import { createResumeJobExperience, getUniqueResumeJobExperiences } from "@/app/_data/resume-job-experience"
import { fuzzyMatch } from "fuzzbunny"

export async function handleFormChange(prevState: ResumeFormState, formData: FormData) {
    const summary = formData.get('summary') as string
    const session = await auth()

    if (await !userOwnsResume(Number(prevState.resume?.id), session?.user?.id as string)) {
        throw new Error('User does not own resume, cannot make edits')
    }

    if (summary) {
        await handFormChangeUpdateSummary(prevState, summary)
    } else {
        await handleFormChangeChatGptSuggestions(prevState)
        await handleFormChangeSuggestionsFromPrevious(prevState)
    }

    // refresh resume content after updates
    revalidatePath('/resume/' + Number(prevState.resume?.id))
    const resumeUpdated = await getResume(Number(prevState.resume?.id))

    return {
        loadSuggestions: false,
        resume: resumeUpdated,
        message: ''
    }
}

async function handFormChangeUpdateSummary(prevState: ResumeFormState, summary: string) {
    await updateResume({
        ...prevState.resume,
        userId: prevState.resume?.userId as string,
        employer: prevState.resume?.employer as string,
        summary: summary
    })  
}

async function handleFormChangeChatGptSuggestions(prevState: ResumeFormState): Promise<void> {
    const bullets: ChatGptSuggestionsrPromptBullet[] = []
    const skills: string[] = prevState.resume?.jobDescription?.skills?.map(skill => skill.skill) || []

    if (!prevState.resume?.jobs) {
        return
    }

    for (const job of prevState.resume.jobs) {
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

    await resetJobDescriptionSkillsUsedField(Number(prevState.resume?.jobDescription?.id))

    for (const suggestion of Array.from(suggestions.result)) {
        await deleteResumeJobExperienceSkills(suggestion.bulletId)
        for (const skill of suggestion.skillsUsed) {
            await createResumeJobExperienceSkill({
                jobExperienceId: suggestion.bulletId,
                skill: skill
            })
            await setJobDescriptionSkillUsedBySkillName(Number(prevState.resume?.jobDescription?.id), skill)
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
}

async function handleFormChangeSuggestionsFromPrevious(prevState: ResumeFormState): Promise<void> {
    if (!prevState.resume?.jobs) {
        return
    }
    for (const job of prevState.resume?.jobs) {
        const suggestions = await getUniqueResumeJobExperiences(Number(job.id))
        const oldContents: string[] = job.experiences?.map(experience => experience.content) || []
        for (const suggestion of suggestions) {
            const fuzzyMatches = 
                oldContents.map(
                    oldContent => fuzzyMatch(suggestion.content, oldContent)
                ).filter(item => {
                    return (item !== null)
                })
            
            if (fuzzyMatches.length === 0) {
                await createResumeJobExperience({
                    ...suggestion,
                    resumeId: Number(prevState.resume.id)
                })
            }
        }
    }
}