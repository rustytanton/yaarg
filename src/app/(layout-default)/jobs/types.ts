import { Job } from "../../_data/job"

export enum JobFormStatuses {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type JobFormState = {
    addSection: boolean
    jobs: Job[]
    message?: string
    status?: JobFormStatuses
    statusUpdated?: Date
}