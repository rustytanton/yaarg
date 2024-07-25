'use server'

import { ChatGptSuggestionsrPromptBullet, getBulletAnalysisAsync, getBulletAnalysisAsyncResult } from "@/app/_lib/chatgpt/assistant-suggestions"
import { ResumeFormState } from "./types"
import { ResumeJobExperienceSkillService } from "@/app/_data/resume-job-experience-skill"
import { ResumeSummarySuggestionService } from "@/app/_data/resume-summary-suggestion"
import { revalidatePath } from "next/cache"
import { ResumeJobExperienceSugggestionService } from "@/app/_data/resume-job-experience-suggestion"
import { Resume, ResumeService } from "@/app/_data/resume"
import { auth } from "@/app/auth"
import { JobDescriptionSkillService } from "@/app/_data/job-description-skill"
import { ResumeJobExperience, ResumeJobExperienceService } from "@/app/_data/resume-job-experience"
import { fuzzyMatch } from "fuzzbunny"
import { ResumeSubmitTypes } from "./types"
import { ChatGptAsyncJobService } from "@/app/_data/chatgpt-async-job"
import { chatGptAsyncJobStatuses } from "@/app/_lib/chatgpt/assistant"

export async function handleFormChange(prevState: ResumeFormState, formData: FormData) {
    const summary = formData.get('summary') as string
    const submitType = formData.get('submitType') as string
    const session = await auth()
    const resumeService = new ResumeService()

    if (await !resumeService.userOwnsItem(session?.user?.id as string, Number(prevState.resume?.id))) {
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
    const resumeUpdated = await resumeService.get(Number(prevState.resume?.id)) as Resume

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
    const resumeService = new ResumeService()
    const suggestionService = new ResumeSummarySuggestionService()
    await resumeService.update({
        ...prevState.resume,
        userId: prevState.resume?.userId as string,
        employer: prevState.resume?.employer as string,
        summary: summary
    })
    await suggestionService.delete(Number(prevState.resume.id))
}

async function handleFormChangeChatGptSuggestions(prevState: ResumeFormState): Promise<void> {
    const bullets: ChatGptSuggestionsrPromptBullet[] = []
    const skills: string[] = prevState.resume?.jobDescription?.skills?.map((skill) => skill.skill) || []

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
    const jobExpService = new ResumeJobExperienceService()
    for (const job of prevState.resume?.jobs) {
        const suggestions = await jobExpService.getAllUniqueByJobId(Number(job.id))
        const oldContents: string[] = job.experiences?.map((experience: ResumeJobExperience) => experience.content) || []
        for (const suggestion of suggestions) {
            const fuzzyMatches = 
                oldContents.map(
                    oldContent => fuzzyMatch(suggestion.content, oldContent)
                ).filter(item => {
                    return (item !== null)
                })
            
            if (fuzzyMatches.length === 0) {
                await jobExpService.create({
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
        const chatGptJobService = new ChatGptAsyncJobService()
        const jdSkillService = new JobDescriptionSkillService()
        const jdResumeJobExpSkillsService = new ResumeJobExperienceSkillService()
        const jeSuggestionService = new ResumeJobExperienceSugggestionService()
        const suggestionService = new ResumeSummarySuggestionService()
        const session = await auth()

        try {
            const suggestions = await getBulletAnalysisAsyncResult(job)
            if (suggestions.status === chatGptAsyncJobStatuses.COMPLETE) {
                await jdSkillService.resetJobDescriptionSkillsUsedField(Number(prevState.resume?.jobDescription?.id))
                
                for (const suggestion of Array.from(suggestions.result)) {
                    await jdResumeJobExpSkillsService.delete(suggestion.bulletId)
                    for (const skill of suggestion.skillsUsed) {
                        await jdResumeJobExpSkillsService.create({
                            id: 0,
                            userId: session?.user?.id as string,
                            jobExperienceId: suggestion.bulletId,
                            skill: skill
                        })
                        await jdSkillService.setJobDescriptionSkillUsedBySkillName(Number(prevState.resume?.jobDescription?.id), skill)
                    }
        
                    await jeSuggestionService.delete(suggestion.bulletId)
                    for (const item of suggestion.qualitySuggestions) {
                        await jeSuggestionService.create({
                            id: 0,
                            userId: session?.user?.id as string,
                            jobExperienceId: suggestion.bulletId,
                            suggestion: item
                        })
                    }
                }
    
                await suggestionService.delete(Number(prevState.resume.id))
                for (const summarySuggestion of suggestions.summaryQualitySuggestions) {
                    await suggestionService.create({
                        id: 0,
                        resumeId: Number(prevState.resume.id),
                        userId: session?.user?.id as string,
                        suggestion: summarySuggestion
                    })
                }
    
                await chatGptJobService.delete(Number(job.id))
            }
        } catch(err) {
            // @todo Sometimes ChatGPT does not return valid JSON, should add UI elements to tell the user. Deleting the job at least restores the page buttons and makes it quit polling.
            console.error(err)
            await chatGptJobService.delete(Number(job.id))
        }
    }
}
