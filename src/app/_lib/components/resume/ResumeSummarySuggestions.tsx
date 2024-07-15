import { Resume } from "@/app/_data/resume"

type Props = {
    resume: Resume
}

export default function ResumeSummarySugggestions({ resume }: Props) {
    if (resume.summarySuggestions) {
        return (
            <ul className="list-disc pl-5 text-red-500 text-sm">
                {resume.summarySuggestions.map((suggestion, suggestionIndex) => {
                    return (
                        <li key={suggestionIndex}>{suggestion.suggestion}</li>
                    )
                })}
            </ul>
        )
    }
}