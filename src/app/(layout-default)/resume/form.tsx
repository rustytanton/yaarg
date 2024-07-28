'use client'

import { useFormState } from "react-dom"
import FormButton from "@/app/_lib/components/form/FormButton"
import FormTextarea from "@/app/_lib/components/form/FormTextarea"
import { handleFormChange } from './actions'
import { ResumeFormNewState, ResumeFormNewStatuses } from './types'
import FormInputText from "@/app/_lib/components/form/FormInputText"
import BodySection from "@/app/_lib/components/body/BodySection"
import ActionsCentered from "@/app/_lib/components/containers/ActionsCentered"
import RequiredInfo from "@/app/_lib/components/form/RequiredInfo"
import { useEffect } from "react"
import toast from "react-hot-toast"

const initialState: ResumeFormNewState = {
    message: '',
    prompt: ''
}

export default function ResumeFormNew() {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState
    })

    useEffect(() => {
        if (state.status === ResumeFormNewStatuses.SUCCESS) {
            toast.success(state.message as string)
        } else if (state.status === ResumeFormNewStatuses.ERROR) {
            toast.error(state.message as string)
        }
    }, [state.message, state.status, state.statusUpdated])

    return (
        <form action={formAction} className="w-3/4 md:w-full">
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
