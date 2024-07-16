'use client'

import FormButton from "@/app/_lib/components/FormButton"
import FormSectionJob from "@/app/_lib/components/FormSectionJob"
import { JobFormState } from "./types"
import { useFormState } from "react-dom"
import { handleFormChange } from './actions'
import FormMessage from "@/app/_lib/components/FormMessage"
import { Job, Jobs } from "../../_data/job"
import ActionsCentered from "@/app/_lib/components/containers/ActionsCentered"
import RequiredInfo from "@/app/_lib/components/form/RequiredInfo"

type Props = {
    jobs: Jobs
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
        <form action={formAction} className="w-3/4">
            <FormMessage message={state.message} />
            <p className="mb-10">You will enter experiences for these jobs later when you build a resume</p>
            <RequiredInfo />
            {state.jobs.length > 0 ?
                state.jobs.map((job: Job, index: number) => {
                    return (
                        <FormSectionJob key={ 'job' + index } index={index} job={job} />
                    )
                })
            :
                <div className="p-5">No jobs entered yet</div>
            }
            <FormButton buttonText="Add Another Section" onClick={() => { state.addSection = true }} isSubmit={true} />
            
            <ActionsCentered>
                <FormButton buttonText="Submit" isSubmit={true} />
            </ActionsCentered>
        </form>
    )
}