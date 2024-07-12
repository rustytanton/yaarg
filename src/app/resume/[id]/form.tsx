'use client'

import { ResumeDTO } from "@/app/_data/resume"
import { ResumeFormState } from "./types"
import { useFormState } from "react-dom"
import { handleFormChange } from "./actions"
import FormButton from "@/app/_lib/components/FormButton"
import Link from "next/link"

type Props = {
    resume: ResumeDTO
}

const initialState: ResumeFormState = {
    message: '',
    resume: undefined
}

export default function ResumeForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        resume: props.resume
    })

    return (
        <form action={formAction}>
            <div className="flex justify-center items-center mb-5">
                <FormButton buttonText="Load AI Suggestions" isSubmit={true} />
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
                                            {experience.content}
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
        </form>
    )
}