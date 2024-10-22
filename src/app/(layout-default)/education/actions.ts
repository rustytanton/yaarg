'use server'

import { EducationFormState, EducationFormStatuses } from './types'
import { revalidatePath } from 'next/cache'
import { auth } from '@/app/auth'
import { fieldGroups, deleteIds } from '@/app/_lib/util/form'
import { Education, EducationService } from '../../_data/education'

export async function handleFormChange(prevState: EducationFormState, formData: FormData): Promise<EducationFormState> {
    const session = await auth()
    const educationService = new EducationService()
    if (session?.user) {
        if (prevState.addSection) {
            return {
                addSection: false,
                educations: prevState.educations.concat([{} as Education]),
                message: 'Added new education section',
                status: EducationFormStatuses.SUCCESS,
                statusUpdated: new Date()
            }
        } else {
            let educations: Education[] = []
            let deletes = deleteIds(formData)
            let groups = fieldGroups(formData, 'education')
    
            for (const id of deletes) {
                if (await educationService.userOwnsItem(session.user.id as string, id)) {
                    await educationService.delete(id)
                }
            }
            
            for (const group of groups) {
                let education: Education = {
                    userId: session.user.id as string,
                    id: Number(formData.get(group + 'id')) || 0,
                    institution: formData.get(group + 'institution')?.toString() || '',
                    major: formData.get(group + 'major')?.toString() || '',
                    minor: formData.get(group + 'minor')?.toString() || '',
                    startDate: formData.get(group + 'startDate') as string,
                    endDate: formData.get(group + 'endDate') as string,
                    gpa: formData.get(group + 'gpa') as string,
                    graduated: formData.get(group + 'graduated') === 'on' ? true : false
                }
    
                if (education.id) {
                    if (await educationService.userOwnsItem(session.user.id as string, education.id)) {
                        await educationService.update(education)
                    }
                } else {
                    education = await educationService.create(education) as Education
                }
    
                educations.push(education)
            }
    
            revalidatePath('/education')
    
            return {
                ...prevState,
                educations: educations,
                message: 'Education updated',
                status: EducationFormStatuses.SUCCESS,
                statusUpdated: new Date()
            }
        }
    } else {
        return prevState
    }
}