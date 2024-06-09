'use server'

import { Education } from '@prisma/client'
import prisma from '../db'
import { EducationFormState } from './types'
import { validDateOrNull } from '../util/formatters'
import { revalidatePath } from 'next/cache'

export async function getEducations() {
    const educations = await prisma.education.findMany()
    return educations || []
}

export async function handleFormChange(prevState: EducationFormState, formData: FormData): Promise<EducationFormState> {        
    if (prevState.addSection) {
        return {
            addSection: false,
            educations: prevState.educations.concat([{} as Education]),
            message: 'Added new education section'
        }
    } else {
        let educations: Education[] = []
        let messages: string[] = []

        let deletes = Array.from(formData.entries())
            .filter((field) => {
                return field[0] === '[delete]'
            })
            .map((field) => {
                return Number(field[1])
            })

        for (const id of deletes) {
            await prisma.education.delete({
                where: { id: id }
            })
            messages.push(`Deleted education ${id}.`) 
        }

        let groups = Array.from(formData.entries())
            .filter((field) => {
                return field[0].indexOf('[education') > -1
            })
            .map((field) => {
                return field[0].split(']')[0] + ']'
            })
            .filter((key, index, arr) => {
                if (index === 0) {
                    return true
                } else {
                    return key !== arr[index-1]
                }
            })
        
        for (const group of groups) {
            let payload = {
                id: Number(formData.get(group + 'id')) || undefined,
                institution: formData.get(group + 'institution')?.toString() || '',
                description: formData.get(group + 'description')?.toString() || '',
                major: formData.get(group + 'major')?.toString() || '',
                minor: formData.get(group + 'minor')?.toString() || '',
                startDate: validDateOrNull(formData.get(group + 'startDate') as string),
                endDate: validDateOrNull(formData.get(group + 'endDate') as string),
                gpa: Number(formData.get(group + 'gpa')),
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
}