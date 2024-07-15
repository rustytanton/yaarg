import { Jobs } from "../../_data/job"

export type JobFormState = {
    addSection: boolean
    jobs: Jobs
    message: string
}