'use client'

import { useFormState } from "react-dom";
import { ChatGptKeywordFormState } from "./types";
import { handleKeywordsFormChange } from "./actions";
import FormButton from "../components/FormButton";

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
        <form action={formAction} className="p-10">
            <h2>Parse Job Description For Keywords</h2>
            <textarea name="prompt" className="p-2 text-black w-full">

            </textarea>
            <FormButton buttonText="Submit" isSubmit={true} />
            {state.result.keywords.skills.map((pair, index) => {
                return (
                    <div key={index}>
                        <strong>{pair.skill}</strong> ({pair.mentioned})
                    </div>
                )
            })}
        </form>
    )
}