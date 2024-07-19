'use server'

import { ChatGptSuggestionsrPromptBullet, getBulletAnalysisAsync, getBulletAnalysisAsyncResult } from "@/app/_lib/chatgpt/assistant-suggestions"
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
import { ResumeSubmitTypes } from "./types"
import { deleteChatGptAsyncJob } from "@/app/_data/chatgpt-async-job"
import { chatGptAsyncJobStatuses } from "@/app/_lib/chatgpt/assistant"

export async function handleFormChange(prevState: ResumeFormState, formData: FormData) {
    const summary = formData.get('summary') as string
    const submitType = formData.get('submitType') as string
    const session = await auth()

    if (await !userOwnsResume(Number(prevState.resume?.id), session?.user?.id as string)) {
        throw new Error('User does not own resume, cannot make edits')
    }

    if (summary) {
        await handFormChangeUpdateSummary(prevState, summary)
    } else if (submitType === ResumeSubmitTypes.CHATGPT_SUGGESTIONS) {
        await handleFormChangeChatGptSuggestions(prevState)
    } else if (submitType === ResumeSubmitTypes.POPULATE_PAST_EXPERIENCES) {
        await handleFormChangeSuggestionsFromPrevious(prevState)
    } else if (submitType === ResumeSubmitTypes.CHATGPT_ASYNC_JOB) {
        await handleFormChangeChatGptAsyncJob(prevState)
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
    if (!prevState.resume) {
        return
    }
    await updateResume({
        ...prevState.resume,
        userId: prevState.resume?.userId as string,
        employer: prevState.resume?.employer as string,
        summary: summary
    })
    await deleteResumeSummarySuggestions(Number(prevState.resume.id))
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
    const job = await getBulletAnalysisAsync(JSON.stringify({
        summary: prevState.resume?.summary,
        skills: skills,
        bullets: bullets
    }), prevState.resume?.id as number)
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

async function handleFormChangeChatGptAsyncJob(prevState: ResumeFormState) {
    if (prevState.resume?.chatGptAsyncJobs && prevState.resume.chatGptAsyncJobs.length > 0) {
        const job = prevState.resume.chatGptAsyncJobs[0]

        try {
            const suggestions = await getBulletAnalysisAsyncResult(job)
            if (suggestions.status === chatGptAsyncJobStatuses.COMPLETE) {
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
    
                await deleteChatGptAsyncJob(Number(job.id))
            }
        } catch(err) {
            // @todo Sometimes ChatGPT does not return valid JSON, should add UI elements to tell the user. Deleting the job at least restores the page buttons and makes it quit polling.
            console.error(err)
            await deleteChatGptAsyncJob(Number(job.id))
        }
    }
}
