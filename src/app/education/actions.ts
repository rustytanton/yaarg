'use server'

import { EducationFormState } from './types'
import { revalidatePath } from 'next/cache'
import { auth } from '@/app/auth'
import { fieldGroups, deleteIds } from '@/app/_lib/util/form'
import { EducationDTO, EducationDTOs, createEducation, userOwnsEducation, updateEducation, deleteEducation } from '../_data/education'

export async function handleFormChange(prevState: EducationFormState, formData: FormData): Promise<EducationFormState> {
    const session = await auth()
    if (session?.user) {
        if (prevState.addSection) {
            return {
                addSection: false,
                educations: prevState.educations.concat([{} as EducationDTO]),
                message: 'Added new education section'
            }
        } else {
            let educations: EducationDTOs = []
            let messages: string[] = []
            let deletes = deleteIds(formData)
            let groups = fieldGroups(formData, 'education')
    
            for (const id of deletes) {
                if (await userOwnsEducation(session.user.id as string, id)) {
                    await deleteEducation(id)
                }
                messages.push(`Deleted education ${id}.`) 
            }
            
            for (const group of groups) {
                let education: EducationDTO = {
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
    
                if (education.id) {
                    if (await userOwnsEducation(session.user.id as string, education.id)) {
                        education = await updateEducation(education)
                    }
                    messages.push(`Updated ${education.id}.`)
                } else {
                    education = await createEducation(education)
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