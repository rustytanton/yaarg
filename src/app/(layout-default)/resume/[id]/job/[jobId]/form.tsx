'use client'

import FormButton from "@/app/_lib/components/form/FormButton"
import Heading2 from "@/app/_lib/components/headings/Heading2"
import { ResumeJobFormState } from "./types"
import { handleFormChange } from "./actions"
import { useFormState } from "react-dom"
import FormTextareaBullet from "@/app/_lib/components/form/FormTextareaBullet"
import FormMessage from "@/app/_lib/components/form/FormMessage"
import { useState } from "react"
import { ResumeJobExperiences } from "@/app/_data/resume-job-experience"
import ResumeWorkExperienceSuggestions from "@/app/_lib/components/resume/ResumeWorkExperienceSuggestions"
import { ResumeJobExperienceSugggestion } from "@/app/_data/resume-job-experience-suggestion"
import ActionsCentered from "@/app/_lib/components/containers/ActionsCentered"
import { Job } from "@/app/_data/job"

type Props = {
    jobExperiences?: ResumeJobExperiences,
    resumeId: number,
    job: Job
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
            <Heading2>Experience - {props.job.employer}</Heading2>
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
                        {experience.suggestions && experience.suggestions.length > 0 ? <div className="mt-5 text-sm text-red-500">AI Suggestions:</div> : ''}
                        <ResumeWorkExperienceSuggestions suggestions={experience.suggestions as ResumeJobExperienceSugggestion[]} />
                    </li>
                )
            })}
            </ul>
            <div>
                <FormButton onClick={() => { setAddExperience(true) }} isSubmit={true} buttonText="Add a bullet"></FormButton>
                <input type="hidden" name="addExperience" value={addExperience.toString()} />
            </div>
            <div>
                <input type="hidden" name="jobId" value={props.job.id} />
                <input type="hidden" name="resumeId" value={props.resumeId} />
                <ActionsCentered>
                    <FormButton onClick={() => { setAddExperience(false) }} isSubmit={true} buttonText="Save"></FormButton>
                </ActionsCentered>
            </div>
        </form>
    )
}