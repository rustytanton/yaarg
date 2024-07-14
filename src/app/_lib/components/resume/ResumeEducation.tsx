import { EducationDTOs } from "@/app/_data/education"
import ResumeHeading3 from "./ResumeHeading3"
import ResumeSubheading from "./ResumeSubheading"

type Props = {
    educations: EducationDTOs
}

export default function ResumeEducation({ educations }: Props) {
    return (
        <div>
            <ResumeSubheading>Education</ResumeSubheading>
            {educations.map((education, educationIndex) => {
                return (
                    <div key={educationIndex} className="mb-5 pl-5">
                        <ResumeHeading3>{education.institution}</ResumeHeading3>
                        <div>{education.startDate} - {education.endDate}</div>
                        <div>{education.major}</div>
                    </div>
                )
            })}
        </div>
    )
}