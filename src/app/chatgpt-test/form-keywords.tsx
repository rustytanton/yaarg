'use client'

import { useFormState } from "react-dom";
import { ChatGptKeywordFormState } from "./types";
import { handleKeywordsFormChange } from "./actions";
import FormButton from "../components/FormButton";
import FormKeywordsList from "../components/FormKeywordsList";

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
            <h2>Parse Job Description For Keywords</h2>
            <textarea name="prompt" className="p-2 text-black w-full h-40">

            </textarea>
            <FormButton buttonText="Submit" isSubmit={true} />
            <FormKeywordsList keywords={state.result.keywords.skills} />
        </form>
    )
}