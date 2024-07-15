import { Educations } from "@/app/_data/education"
import ResumeHeading3 from "./ResumeHeading3"
import ResumeSubheading from "./ResumeSubheading"

type Props = {
    educations: Educations
}

export default function ResumeEducation({ educations }: Props) {
    if (educations.length > 0) {
        return (
            <div>
                <ResumeSubheading>Education</ResumeSubheading>
                {educations.map((education, educationIndex) => {
                    return (
                        <div key={educationIndex} className="mb-5 pl-5">
                            <ResumeHeading3>{education.institution}</ResumeHeading3>
                            <div>{education.major}</div>
                            {education.startDate && education.endDate
                                ? <div>{education.startDate} - {education.endDate}</div>
                                : ''
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}