'use server'

import { ResumeFormNewState } from './types'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import { getSkills } from '@/app/_lib/chatgpt/assistant-skills-extractor'
import { createJobDescription } from '@/app/_data/job-description'
import { createJobDescriptionSkill } from '@/app/_data/job-description-skill'
import { createResume } from '@/app/_data/resume'

export async function handleFormChange(prevState: ResumeFormNewState, formData: FormData) {
    const session = await auth()
    if (session?.user) {
        const employer = formData.get('employer') as string
        const prompt = formData.get('prompt') as string
        
        if (!employer || !prompt) {
            return {
                ...prevState,
                message: 'You must enter both an employer and a job description to proceed'
            }
        }
        
        const skills = await getSkills(prompt)
        const jd = await createJobDescription({
            userId: session.user.id as string,
            text: prompt
        })
        const resume = await createResume({
            userId: session.user.id as string,
            employer: employer,
            jobDescription: jd
        })
        for (const skill of skills) {
            if (jd.id) {
                await createJobDescriptionSkill({
                    jobDescriptionId: jd.id,
                    skill: skill.skill,
                    mentions: skill.mentions
                })
            }
        }

        redirect(`/resume/${resume.id}`)
    } else {
        return {
            ...prevState,
            message: 'You must be logged in to submit the form'
        }
    }
}