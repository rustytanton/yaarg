import { Job } from "@prisma/client"

export type JobFormState = {
    addSection: boolean
    jobs: Job[]
    message: string
}