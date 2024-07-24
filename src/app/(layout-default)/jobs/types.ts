import { Job } from "../../_data/job"

export type JobFormState = {
    addSection: boolean
    jobs: Job[]
    message: string
}