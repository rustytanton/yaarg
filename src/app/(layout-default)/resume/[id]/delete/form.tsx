'use client'

import FormButton from "@/app/_lib/components/FormButton"
import { handleFormChange } from "./actions"
import { useFormState } from "react-dom"
import { ResumeFormDeleteState } from "./types"
import FormMessage from "@/app/_lib/components/FormMessage"
import Link from "next/link"
import ActionsCentered from "@/app/_lib/components/containers/ActionsCentered"

type Props = {
    id: string
}

export default function ResumeDeleteForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {} as ResumeFormDeleteState)

    if (state.message) {
        return (
            <>
                <FormMessage message={state.message} />
                <Link href="/resumes">Return to Resumes</Link>
            </>
        )
    } else {
        return (
            <form action={formAction}>
                <h2>Are you sure you want to delete Resume {props.id}?</h2>
                <ActionsCentered>
                    <FormButton buttonText="Yes" isSubmit={true}  />
                    <FormButton buttonText="No" href="/resumes"  />
                </ActionsCentered>
                <input type="hidden" name="resumeId" value={props.id} />
            </form>
        )
    }
}