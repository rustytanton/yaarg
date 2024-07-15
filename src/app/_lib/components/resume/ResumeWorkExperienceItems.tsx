import { ResumeJobExperiences } from "@/app/_data/resume-job-experience"
import ResumeWorkExperienceSuggestions from "./ResumeWorkExperienceSuggestions"
import { ResumeJobExperienceSugggestions } from "@/app/_data/resume-job-experience-suggestion"

type Props = {
    experiences: ResumeJobExperiences
}

export default function ResumeWorkExperienceItems({ experiences }: Props) {
    if (experiences.length > 0) {
        return (
            <ul className="list-disc pl-5">
                {experiences?.map((experience, experienceIndex) => {
                    return (
                        <li key={experienceIndex}>
                            <div>{experience.content}</div>
                            <ResumeWorkExperienceSuggestions suggestions={experience.suggestions as ResumeJobExperienceSugggestions} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}