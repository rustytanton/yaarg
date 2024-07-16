'use client'

import { useFormState } from "react-dom"
import FormButton from "@/app/_lib/components/FormButton"
import FormTextarea from "@/app/_lib/components/FormTextarea"
import { handleFormChange } from './actions'
import { ResumeFormNewState } from './types'
import FormMessage from "@/app/_lib/components/FormMessage"
import FormInputText from "@/app/_lib/components/FormInputText"
import BodySection from "@/app/_lib/components/BodySection"
import ActionsCentered from "@/app/_lib/components/containers/ActionsCentered"
import RequiredInfo from "@/app/_lib/components/form/RequiredInfo"

const initialState: ResumeFormNewState = {
    message: '',
    prompt: ''
}

export default function ResumeFormNew() {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState
    })

    return (
        <form action={formAction} className="p-10 w-3/4">
            <FormMessage message={state.message} />
            <RequiredInfo />
            <BodySection>
                <FormInputText label='Employer' inputName="employer" required={true} />
            </BodySection>
            <BodySection>
                <FormTextarea inputName='prompt' label='Paste in the description from the job you want to apply for:' required={true} />
            </BodySection>
            <ActionsCentered>
                <FormButton buttonText="Next" isSubmit={true} pendingMessage="Extracting skills with ChatGPT..." />
            </ActionsCentered>
        </form>
    )
}
