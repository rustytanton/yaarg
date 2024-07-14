import { EducationDTO } from "@/app/_data/education"

type Props = {
    education: EducationDTO
}

export default function ResumePrintEducation({ education }: Props) {
    return (
        <div>
            <div className="mb-5 pl-5">
                <h3 className="text-xl">{education.institution}</h3>
                <div>
                    {education.startDate}
                    &nbsp;-&nbsp;
                    {education.endDate}

                    {education.major
                        ? <div>Major: {education.major}</div>
                        : ''
                    }

                    {education.minor
                        ? <div>Minor: {education.minor}</div>
                        : ''
                    }

                    {education.gpa
                        ? <div>GPA: {education.gpa}</div>
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}