'use client'

import { useFormState } from "react-dom"
import FormButton from "@/app/components/FormButton"
import FormTextarea from "@/app/components/FormTextarea"
import { handleFormChange } from './actions'
import { ResumeFormNewState } from './types'
import FormMessage from "@/app/components/FormMessage"

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
            <FormTextarea inputName='prompt' label='Paste in the description from the job you want to apply for:' />
            <FormButton buttonText="Next" isSubmit={true} pendingMessage="Extracting skills with ChatGPT..." />
        </form>
    )
}
