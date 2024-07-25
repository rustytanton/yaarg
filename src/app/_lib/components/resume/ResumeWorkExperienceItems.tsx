import { ResumeJobExperience } from "@/app/_data/resume-job-experience"
import ResumeWorkExperienceSuggestions from "./ResumeWorkExperienceSuggestions"
import { ResumeJobExperienceSugggestion } from "@/app/_data/resume-job-experience-suggestion"

type Props = {
    experiences: ResumeJobExperience[]
}

export default function ResumeWorkExperienceItems({ experiences }: Props) {
    if (experiences.length > 0) {
        return (
            <ul className="list-disc pl-5">
                {experiences?.map((experience, experienceIndex) => {
                    return (
                        <li key={experienceIndex}>
                            <div>{experience.content}</div>
                            <ResumeWorkExperienceSuggestions suggestions={experience.suggestions as ResumeJobExperienceSugggestion[]} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}