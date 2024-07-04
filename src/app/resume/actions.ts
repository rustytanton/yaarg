'use server'

import { ResumeFormNewState } from './types'
import prisma from '@/app/db'
import { auth } from '@/app/auth'
import { redirect } from 'next/navigation'
import { getSkills } from '@/app/_lib/chatgpt/assistant-skills-extractor'

export async function handleFormChange(prevState: ResumeFormNewState, formData: FormData) {
    const session = await auth()
    if (session && session.user) {
        const employer = formData.get('employer') as string
        const prompt = formData.get('prompt') as string
        
        if (!employer || !prompt) {
            return {
                ...prevState,
                message: 'You must enter both an employer and a job description to proceed'
            }
        }
        
        const skills = await getSkills(prompt)
        const jd = await prisma.jobDescription.create({
            data: {
                userId: session.user.id as string,
                text: prompt
            }
        })
        const resume = await prisma.resume.create({
            data: {
                userId: session.user.id as string,
                employer: employer,
                jobDescriptionId: jd.id
            }
        })
        for (const skill of skills) {
            await prisma.jobDescriptionSkill.create({
                data: {
                    jobDescriptionId: jd.id,
                    skill: skill.skill,
                    mentions: skill.mentions
                }
            })
        }

        redirect(`/resume/${resume.id}`)
    } else {
        return {
            ...prevState,
            message: 'You must be logged in to submit the form'
        }
    }
}