'use client'

import FormButton from "../components/FormButton"
import FormSectionJob from "../components/FormSectionJob"
import { Job } from "@prisma/client"
import { JobFormState } from "./types"
import { useFormState } from "react-dom"
import { handleFormChange } from './actions'
import FormMessage from "../components/FormMessage"

type Props = {
    jobs: Job[]
}

const initialState: JobFormState = {
    addSection: false,
    jobs: [],
    message: ''
}

export default function JobForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        jobs: props.jobs
    })

    return (
        <form action={formAction}>
            <FormMessage message={state.message} />
            <p className="mb-10">You will enter experiences for these jobs later when you build a resume</p>
            {state.jobs.length > 0 ?
                state.jobs.map((job, index) => {
                    return (
                        <FormSectionJob key={ 'job' + index } index={index} job={job} />
                    )
                })
            :
                <div className="p-5">No jobs entered yet</div>
            }
            <FormButton buttonText="Add Another Section" onClick={() => { state.addSection = true }} isSubmit={true} />
            <FormButton buttonText="Submit" isSubmit={true} />
        </form>
    )
}