'use server'

import { ChatGptSuggestionsPromptBullet, getBulletAnalysisAsync, getBulletAnalysisAsyncResult } from "@/app/_lib/chatgpt/assistant-suggestions"
import { ResumeFormState, ResumeFormStatuses } from "./types"
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
import { ChatGptAsyncJob, ChatGptAsyncJobService } from "@/app/_data/chatgpt-async-job"
import { chatGptAsyncJobStatuses, chatGptAsyncJobTypes } from "@/app/_lib/chatgpt/assistant"
import { getSummaryAnalysisAsync, getSummaryAnalysisAsyncResult } from "@/app/_lib/chatgpt/assistant-suggestions-summary"

export async function handleFormChange(prevState: ResumeFormState, formData: FormData): Promise<ResumeFormState> {
    const summary = formData.get('summary') as string
    const submitType = formData.get('submitType') as string
    const session = await auth()
    const resumeService = new ResumeService()
    let successMessage = ''

    if (await !resumeService.userOwnsItem(session?.user?.id as string, Number(prevState.resume?.id))) {
        throw new Error('User does not own resume, cannot make edits')
    }

    if (summary) {
        await handFormChangeUpdateSummary(prevState, summary)
        successMessage = 'Summary updated'
    } else if (submitType === ResumeSubmitTypes.CHATGPT_SUGGESTIONS) {
        await handleFormChangeChatGptSuggestions(prevState)
    } else if (submitType === ResumeSubmitTypes.POPULATE_PAST_EXPERIENCES) {
        await handleFormChangeSuggestionsFromPrevious(prevState)
        successMessage = 'Loaded experience from previous resumes'
    } else if (submitType === ResumeSubmitTypes.CHATGPT_ASYNC_JOB) {
        await handleFormChangeChatGptAsyncJob(prevState)
        successMessage = 'Loaded suggestions from ChatGPT'
    }

    // refresh resume content after updates
    revalidatePath('/resume/' + Number(prevState.resume?.id))
    const resumeUpdated = await resumeService.get(Number(prevState.resume?.id)) as Resume

    return {
        loadSuggestions: false,
        resume: resumeUpdated,
        message: successMessage,
        status: ResumeFormStatuses.SUCCESS,
        statusUpdated: new Date()
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
        summary: summary
    })
    await suggestionService.deleteAllByResumeId(Number(prevState.resume.id))
}

async function handleFormChangeChatGptSuggestions(prevState: ResumeFormState): Promise<void> {
    const skills: string[] = prevState.resume?.jobDescription?.skills?.map((skill) => skill.skill) || []
    const jdSkillService = new JobDescriptionSkillService()

    if (!prevState.resume?.jobs) {
        return
    }

    await getSummaryAnalysisAsync(JSON.stringify({
        summary: prevState.resume?.summary,
        skills: skills
    }), prevState.resume?.id as number)

    await jdSkillService.resetJobDescriptionSkillsUsedField(Number(prevState.resume?.jobDescription?.id))

    for (const job of prevState.resume.jobs) {
        const bullets: ChatGptSuggestionsPromptBullet[] = []
        if (job.experiences) {
            for (const experience of job.experiences) {
                bullets.push({
                    bulletId: Number(experience.id),
                    bulletText: experience.content
                })
            }

            await getBulletAnalysisAsync(JSON.stringify({
                skills: skills,
                bullets: bullets
            }), prevState.resume?.id as number)
        }
    }
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
        const chatGptJobService = new ChatGptAsyncJobService()

        for (const job of prevState.resume.chatGptAsyncJobs) {
            try {
                if (job.jobType === chatGptAsyncJobTypes.BULLET_SUGGESTIONS) {
                    await handleFormChangeChatGptAsyncJobBullets(prevState, job)
                } else if (job.jobType === chatGptAsyncJobTypes.SUMMARY_SUGGESTIONS) {
                    await handleFormChangeChatGptAsyncJobSummary(prevState, job)
                }
            } catch(err) {
                // @todo Sometimes ChatGPT does not return valid JSON, should add UI elements to tell the user. Deleting the job at least restores the page buttons and makes it quit polling.
                console.error(err)
                await chatGptJobService.delete(Number(job.id))
            }
        }
    }
}

async function handleFormChangeChatGptAsyncJobSummary(prevState: ResumeFormState, job: ChatGptAsyncJob) {
    const chatGptJobService = new ChatGptAsyncJobService()
    const suggestionService = new ResumeSummarySuggestionService()
    const session = await auth()
    const suggestions = await getSummaryAnalysisAsyncResult(job)
    if (suggestions.status === chatGptAsyncJobStatuses.COMPLETE) {
        await suggestionService.deleteAllByResumeId(Number(prevState.resume.id))
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
}

async function handleFormChangeChatGptAsyncJobBullets(prevState: ResumeFormState, job: ChatGptAsyncJob) {
    const chatGptJobService = new ChatGptAsyncJobService()
    const jdSkillService = new JobDescriptionSkillService()
    const jdResumeJobExpSkillsService = new ResumeJobExperienceSkillService()
    const jeSuggestionService = new ResumeJobExperienceSugggestionService()
    const session = await auth()
    const suggestions = await getBulletAnalysisAsyncResult(job)
    if (suggestions.status === chatGptAsyncJobStatuses.COMPLETE) {       
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

            await jeSuggestionService.deleteSuggestionsByExperienceId(suggestion.bulletId)
            for (const item of suggestion.qualitySuggestions) {
                await jeSuggestionService.create({
                    id: 0,
                    userId: session?.user?.id as string,
                    jobExperienceId: suggestion.bulletId,
                    suggestion: item
                })
            }
        }

        await chatGptJobService.delete(Number(job.id))
    }
}