'use client'

import { useFormState } from 'react-dom'
import { handleFormChange } from './actions'
import FormMessage from '@/app/_lib/components/form/FormMessage'
import FormSectionEducation from '@/app/_lib/components/form/FormSectionEducation'
import FormButton from '@/app/_lib/components/form/FormButton'
import { EducationFormState, EducationFormStatuses } from './types'
import { Education } from '../../_data/education'
import ActionsCentered from '@/app/_lib/components/containers/ActionsCentered'
import RequiredInfo from '@/app/_lib/components/form/RequiredInfo'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const initialState: EducationFormState = {
    addSection: false,
    educations: [],
    message: ''
}

type Props = {
    educations: Education[]
}

export default function EducationForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        educations: props.educations
    })

    useEffect(() => {
        if (state.status === EducationFormStatuses.SUCCESS) {
            toast.success(state.message as string)
        } else if (state.status === EducationFormStatuses.ERROR) {
            toast.error(state.message as string)
        }
    }, [state.message, state.status, state.statusUpdated])

    return (
        <form action={formAction} className="p-10">
            <p className="mb-10">Note: You can use this section for credentials too (examples: SCM, PMP, etc)</p>
            <RequiredInfo />
            {state.educations.length > 0 ? state.educations.map((education: Education, index: number) => {
                return (
                    <FormSectionEducation key={'education-' + index} index={index} education={education} />
                )
            }) : 'No education sections added yet'}
            <FormButton buttonText="Add Another Section" onClick={() => { state.addSection = true }} isSubmit={true} />
            <ActionsCentered>
                <FormButton buttonText="Submit" isSubmit={true} />
            </ActionsCentered>
        </form>
    )
}