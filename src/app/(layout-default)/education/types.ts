import { Education } from "../../_data/education"

export type EducationFormState = {
    addSection: boolean
    educations: Education[]
    message: string
}