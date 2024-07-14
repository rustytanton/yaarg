'use client'

import { useFormState } from "react-dom"
import FormButton from "@/app/_lib/components/FormButton"
import FormTextarea from "@/app/_lib/components/FormTextarea"
import { handleFormChange } from './actions'
import { ResumeFormNewState } from './types'
import FormMessage from "@/app/_lib/components/FormMessage"
import FormInputText from "@/app/_lib/components/FormInputText"

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
            <div className="pb-10">
                <FormInputText label='Employer' inputName="employer" />
            </div>
            <FormTextarea inputName='summary' label='Enter a summary to appear at the top of your resume:' />
            <FormTextarea inputName='prompt' label='Paste in the description from the job you want to apply for:' />
            <FormButton buttonText="Next" isSubmit={true} pendingMessage="Extracting skills with ChatGPT..." />
        </form>
    )
}
