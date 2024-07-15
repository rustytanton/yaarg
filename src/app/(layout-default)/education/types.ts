import { Educations } from "../../_data/education"

export type EducationFormState = {
    addSection: boolean
    educations: Educations
    message: string
}