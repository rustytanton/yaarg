'use server'

import { Education } from '@prisma/client'
import prisma from '@/app/db'
import { EducationFormState } from './types'
import { revalidatePath } from 'next/cache'
import { auth } from '@/app/auth'
import { fieldGroups, deleteIds } from '@/app/_lib/util/form'

export async function getEducations() {
    const session = await auth()

    if (session && session.user) {
        const educations = await prisma.education.findMany({
            where: {
                userId: session.user.id
            }
        })
        return educations || []
    } else {
        return []
    }
}

export async function handleFormChange(prevState: EducationFormState, formData: FormData): Promise<EducationFormState> {
    const session = await auth()
    if (session && session.user) {
        if (prevState.addSection) {
            return {
                addSection: false,
                educations: prevState.educations.concat([{} as Education]),
                message: 'Added new education section'
            }
        } else {
            let educations: Education[] = []
            let messages: string[] = []
            let deletes = deleteIds(formData)
            let groups = fieldGroups(formData, 'education')
    
            for (const id of deletes) {
                await prisma.education.delete({
                    where: { id: id }
                })
                messages.push(`Deleted education ${id}.`) 
            }
            
            for (const group of groups) {
                let payload = {
                    userId: session.user.id as string,
                    id: Number(formData.get(group + 'id')) || undefined,
                    institution: formData.get(group + 'institution')?.toString() || '',
                    major: formData.get(group + 'major')?.toString() || '',
                    minor: formData.get(group + 'minor')?.toString() || '',
                    startDate: formData.get(group + 'startDate') as string,
                    endDate: formData.get(group + 'endDate') as string,
                    gpa: formData.get(group + 'gpa') as string,
                    graduated: formData.get(group + 'graduated') === 'on' ? true : false
                }
    
                let education: Education
    
                if (payload.id) {
                    education = await prisma.education.update({
                        where: { id: payload.id },
                        data: { ...payload }
                    })
                    messages.push(`Updated ${education.id}.`)
                } else {
                    education = await prisma.education.create({
                        data: { ...payload }
                    })
                    messages.push(`Created ${education.id}.`)
                }
    
                educations.push(education)
            }
    
            revalidatePath('/education')
    
            return {
                ...prevState,
                educations: educations,
                message: messages.join(' ')
            }
        }
    } else {
        return prevState
    }
}