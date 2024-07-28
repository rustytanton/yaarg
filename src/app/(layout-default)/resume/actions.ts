'use server'

import { ResumeFormNewState, ResumeFormNewStatuses } from './types'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import { getSkills } from '@/app/_lib/chatgpt/assistant-skills-extractor'
import { JobDescription, JobDescriptionService } from '@/app/_data/job-description'
import { JobDescriptionSkillService } from '@/app/_data/job-description-skill'
import { Resume, ResumeService } from '@/app/_data/resume'

export async function handleFormChange(prevState: ResumeFormNewState, formData: FormData): Promise<ResumeFormNewState> {
    const session = await auth()
    if (session?.user) {
        const employer = formData.get('employer') as string
        const prompt = formData.get('prompt') as string
        const summary = formData.get('summary') as string
        const jdService = new JobDescriptionService()
        const jdSkillService = new JobDescriptionSkillService()
        const resumeService = new ResumeService()
        
        if (!employer || !prompt) {
            return {
                ...prevState,
                message: 'You must enter both an employer and a job description to proceed'
            }
        }
        
        const skills = await getSkills(prompt)
        const jd = await jdService.create({
            id: 0,
            userId: session.user.id as string,
            text: prompt
        }) as JobDescription
        const resume = await resumeService.create({
            id: 0,
            userId: session.user.id as string,
            employer: employer,
            jobDescription: jd,
            summary: summary
        }) as Resume
        for (const skill of skills) {
            if (jd.id) {
                await jdSkillService.create({
                    id: 0,
                    userId: session.user.id as string,
                    jobDescriptionId: jd.id,
                    skill: skill.skill,
                    mentions: skill.mentions,
                    usedInResume: false
                })
            }
        }

        redirect(`/resume/${resume.id}`)
    } else {
        return {
            ...prevState,
            message: 'You must be logged in to submit the form',
            status: ResumeFormNewStatuses.ERROR,
            statusUpdated: new Date()
        }
    }
}