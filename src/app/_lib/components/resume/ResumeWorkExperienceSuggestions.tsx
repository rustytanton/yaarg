import { ResumeJobExperienceSugggestions } from "@/app/_data/resume-job-experience-suggestion"

type Props = {
    suggestions: ResumeJobExperienceSugggestions
}

export default function ResumeWorkExperienceSuggestions({suggestions}: Props) {
    if (suggestions?.length) {
        return (
            <ul className="list-disc pl-5 text-red-500 text-sm">
                {suggestions.map((suggestion, suggestionIndex) => {
                    return (
                        <li key={suggestionIndex}>{suggestion.suggestion}</li>
                    )
                })}
            </ul>
        )
    }
}