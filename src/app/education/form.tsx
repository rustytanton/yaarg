'use client'

import { useFormState } from 'react-dom'
import { handleFormChange } from './actions'
import FormMessage from '@/app/_lib/components/FormMessage'
import FormSectionEducation from '@/app/_lib/components/FormSectionEducation'
import FormButton from '@/app/_lib/components/FormButton'
import { EducationFormState } from './types'
import { EducationDTO, EducationDTOs } from '../_data/education'

const initialState: EducationFormState = {
    addSection: false,
    educations: [],
    message: ''
}

type Props = {
    educations: EducationDTOs
}

export default function EducationForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        educations: props.educations
    })

    return (
        <form action={formAction} className="p-10">
            <FormMessage message={state?.message} />
            <p>Note: You can use this section for credentials too (examples: SCM, PMP, etc)</p>
            {state.educations.length > 0 ? state.educations.map((education: EducationDTO, index: number) => {
                return (
                    <>
                        <FormSectionEducation key={'education-' + index} index={index} education={education} />
                    </>
                )
            }) : 'No education sections added yet'}
            <FormButton buttonText="Add Another Section" onClick={() => { state.addSection = true }} isSubmit={true} />
            <FormButton buttonText="Submit" isSubmit={true} />
        </form>
    )
}