'use client'

import FormButton from "@/app/_lib/components/FormButton"
import Heading3 from "@/app/_lib/components/Heading3"
import { ResumeJobFormState } from "./types"
import { handleFormChange } from "./actions"
import { useFormState } from "react-dom"
import FormTextareaBullet from "@/app/_lib/components/FormTextareaBullet"
import FormMessage from "@/app/_lib/components/FormMessage"
import { useState } from "react"
import { ResumeJobExperienceDTOs } from "@/app/_data/resume-job-experience"

type Props = {
    jobExperiences?: ResumeJobExperienceDTOs,
    resumeId: number,
    jobId: number
}

const initialState: ResumeJobFormState = {
    addExperience: false,
    experiences: [],
    message: '',
    resumeId: 0,
    jobId: 0
}

export default function FormResumeJob(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        experiences: props.jobExperiences
    })

    const [addExperience, setAddExperience] = useState(false)

    return (
        <form action={formAction}>
            <Heading3>Experience</Heading3>
            <FormMessage message={state.message} />
            <ul className="list-outside list-disc-offsettop">
            {state.experiences?.map((experience, index) => {
                return (
                    <li className="mb-10" key={index}>
                        <FormTextareaBullet
                            inputName={ "[experience" + index + "]content" }
                            contentId={experience.id}
                            defaultValue={experience.content}
                        />
                    </li>
                )
            })}
            </ul>
            <div>
                <FormButton onClick={() => { setAddExperience(true) }} isSubmit={true} buttonText="Add a bullet"></FormButton>
                <input type="hidden" name="addExperience" value={addExperience.toString()} />
            </div>
            <div>
                <input type="hidden" name="jobId" value={props.jobId} />
                <input type="hidden" name="resumeId" value={props.resumeId} />
                <FormButton onClick={() => { setAddExperience(false) }} isSubmit={true} buttonText="Save"></FormButton>
            </div>
        </form>
    )
}