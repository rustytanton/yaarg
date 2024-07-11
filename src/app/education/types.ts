import { EducationDTOs } from "../_data/education"

export type EducationFormState = {
    addSection: boolean
    educations: EducationDTOs
    message: string
}