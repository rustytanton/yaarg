import { Education } from "@prisma/client"

export type EducationFormState = {
    addSection: boolean
    educations: Education[]
    message: string
}