'use client'

import { useFormState } from "react-dom";
import { ChatGptKeywordFormState } from "./types";
import { handleKeywordsFormChange } from "./actions";
import FormButton from "@/app/_lib/components/FormButton";
import FormSkillsList from "@/app/_lib/components/FormSkillsList";
import FormTextarea from "@/app/_lib/components/FormTextarea";

const initialState: ChatGptKeywordFormState = {
    prompt: '',
    result: {
        keywords: {
            skills: []
        }
    }
}

export default function FormKeywords() {
    const [state, formAction] = useFormState(handleKeywordsFormChange, {
        ...initialState
    })

    return (
        <form action={formAction} className="p-10 w-3/4">
            <FormTextarea inputName='prompt' label='Paste in the description from the job you want to apply for:' />
            <FormButton buttonText="Submit" isSubmit={true} />
            <FormSkillsList skills={state.result.keywords.skills} />
        </form>
    )
}