'use client'

import FormButton from "@/app/components/FormButton"
import { handleFormChange } from "./actions"
import { useFormState } from "react-dom"
import { ResumeFormDeleteState } from "./types"
import FormMessage from "@/app/components/FormMessage"
import Link from "next/link"

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
                <div className="flex items-center">
                    <FormButton buttonText="Yes" isSubmit={true}  />
                    <FormButton buttonText="No" href="/resumes"  />
                </div>
                <input type="hidden" name="resumeId" value={props.id} />
            </form>
        )
    }
}