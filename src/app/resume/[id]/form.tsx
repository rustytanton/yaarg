'use client'

import { ResumeDTO } from "@/app/_data/resume"
import { ResumeFormState } from "./types"
import { useFormState } from "react-dom"
import { handleFormChange } from "./actions"
import FormButton from "@/app/_lib/components/FormButton"
import Link from "next/link"
import { useState } from "react"
import FormTextarea from "@/app/_lib/components/FormTextarea"
import TextareaAutosize from 'react-textarea-autosize'

type Props = {
    resume: ResumeDTO
}

const initialState: ResumeFormState = {
    loadSuggestions: false,
    message: ''
}

export default function ResumeForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        resume: props.resume
    })

    const [suggestions, setSuggestions] = useState(false)
    const [editSummary, setEditSummary] = useState(false)

    return (
        <form action={formAction}>
            <div className="flex justify-center items-center mb-5">
                <FormButton onClick={() => { setSuggestions(true) }} buttonText="Load AI Suggestions" isSubmit={true} pendingMessage="Analyzing with ChatGPT, this could take a few moments..." />
            </div>
            <div className="bg-white text-black p-10 mb-5 w-full">
                <h1 className="text-4xl mb-2">{state.resume?.user?.firstName} {state.resume?.user?.lastName}</h1>
                <div className="mb-5">
                    <div className="text-sm">
                        {state.resume?.user?.phoneNumber} |&nbsp;
                        {state.resume?.user?.email} |&nbsp;
                        {state.resume?.user?.location}
                    </div>
                    <div className="text-sm pt-2">
                        <div>{state.resume?.user?.linkedIn}</div>
                        <div>{state.resume?.user?.github}</div>
                    </div>
                </div>
                <div className="mb-10">
                    {editSummary
                        ?
                            <>
                                <TextareaAutosize
                                    className="p-2 w-full h-10 outline-0 resize-none"
                                    name='summary'
                                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                >{state.resume?.summary}</TextareaAutosize>
                                <div className="flex">
                                    <FormButton buttonText="Save" isSubmit={true} />
                                    <FormButton buttonText="Cancel" onClick={() => { setEditSummary(false) }} />
                                </div>
                            </>
                        :
                            <div>
                                {state.resume?.summary}
                                &nbsp;|&nbsp;<a className="text-sm" href='' onClick={(e) => { e.preventDefault(); setEditSummary(true) } }>Edit</a>
                            </div>
                    }
                    {state.resume?.summarySuggestions && state.resume?.summarySuggestions.length > 0
                        ?
                            <ul className="list-disc pl-5 text-red-500 text-sm">
                                {state.resume?.summarySuggestions.map((suggestion, suggestionIndex) => {
                                    return (
                                        <li key={suggestionIndex}>{suggestion.suggestion}</li>
                                    )
                                })}
                            </ul>
                        :
                            ''
                    }
                </div>
                <div className="mb-10">
                    <h2 className="text-2xl mb-5">Work Experience</h2>
                    {state.resume?.jobs?.map((job, jobIndex) => {
                        return (
                            <div key={jobIndex} className="mb-5 pl-5">
                                <div className="flex items-center">
                                    <h3 className="text-xl">{job.employer}</h3>&nbsp;|&nbsp;
                                    <Link className="text-sm" href={ '/resume/' + state.resume?.id + '/job/' + job.id  }>Edit</Link>
                                </div>
                                <div className="text-sm">
                                    {job.location} | {job.startDate} - {job.stillWorksHere ? 'present' : job.endDate}
                                </div>
                                <ul className="list-disc pl-5">
                                {job.experiences?.map((experience, experienceIndex) => {
                                    return (
                                        <li key={experienceIndex}>
                                            <div>{experience.content}</div>
                                            {(experience.suggestions && experience.suggestions.length > 0)
                                                ?
                                                    <ul className="list-disc pl-5 text-red-500 text-sm">
                                                        {experience.suggestions.map((suggestion, suggestionIndex) => {
                                                            return (
                                                                <li key={suggestionIndex}>{suggestion.suggestion}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                :
                                                    ''
                                            }
                                        </li>
                                    )
                                })}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <h2 className="text-2xl">Education</h2>
                {state.resume?.educations?.map((education, educationIndex) => {
                    return (
                        <div key={educationIndex} className="mb-5 pl-5">
                            <h3 className="text-xl">{education.institution}</h3>
                            <div>{education.startDate} - {education.endDate}</div>
                            <div>{education.major}</div>
                        </div>
                    )
                })}
            </div>
            {suggestions ? <input name="suggestions" type="hidden" value="true" /> : '' }
        </form>
    )
}