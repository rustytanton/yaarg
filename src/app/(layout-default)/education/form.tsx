'use client'

import { useFormState } from 'react-dom'
import { handleFormChange } from './actions'
import FormMessage from '@/app/_lib/components/FormMessage'
import FormSectionEducation from '@/app/_lib/components/FormSectionEducation'
import FormButton from '@/app/_lib/components/FormButton'
import { EducationFormState } from './types'
import { Education, Educations } from '../../_data/education'
import ActionsCentered from '@/app/_lib/components/containers/ActionsCentered'
import RequiredInfo from '@/app/_lib/components/form/RequiredInfo'

const initialState: EducationFormState = {
    addSection: false,
    educations: [],
    message: ''
}

type Props = {
    educations: Educations
}

export default function EducationForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        educations: props.educations
    })

    return (
        <form action={formAction} className="p-10">
            <FormMessage message={state?.message} />
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