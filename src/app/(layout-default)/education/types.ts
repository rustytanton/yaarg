import { Education } from "../../_data/education"

export enum EducationFormStatuses {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type EducationFormState = {
    addSection: boolean
    educations: Education[]
    message?: string,
    status?: EducationFormStatuses,
    statusUpdated?: Date
}