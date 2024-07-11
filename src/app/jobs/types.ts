import { JobDTOs } from "../_data/job"

export type JobFormState = {
    addSection: boolean
    jobs: JobDTOs
    message: string
}