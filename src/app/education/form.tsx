'use client'

import { useFormState } from 'react-dom'
import { handleFormChange } from './actions'
import FormMessage from '../components/FormMessage'
import FormSectionEducation from '../components/FormSectionEducation'
import FormButton from '../components/FormButton'
import { Education } from '@prisma/client'
import { EducationFormState } from './types'
import { useRouter } from 'next/navigation'

const initialState: EducationFormState = {
    addSection: false,
    educations: [],
    message: ''
}

type Props = {
    educations: Education[]
}

export default function EducationForm(props: Props) {
    const router = useRouter()

    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        educations: props.educations
    })

    return (
        <form action={formAction}>
            <FormMessage message={state?.message} />
            <p>Note: You can use this section for credentials too (examples: SCM, PMP, etc)</p>
            {state.educations.length > 0 ? state.educations.map((education: Education, index: number) => {
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