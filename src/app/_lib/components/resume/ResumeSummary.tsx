import { ResumeDTO } from "@/app/_data/resume"
import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import FormButton from "../FormButton"
import ResumeSummarySugggestions from "./ResumeSummarySuggestions"
import BodySection from "../BodySection"

type Props = {
    resume: ResumeDTO
}

export default function ResumeSummary({ resume }: Props) {
    const [editSummary, setEditSummary] = useState(false)

    if (editSummary) {
        return (
            <BodySection>
                <div>
                    <TextareaAutosize
                        className="p-2 w-full h-10 outline-0 resize-none"
                        name='summary'
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >{resume?.summary}</TextareaAutosize>
                    <div className="flex">
                        <FormButton buttonText="Save" isSubmit={true} />
                        <FormButton buttonText="Cancel" onClick={() => { setEditSummary(false) }} />
                    </div>
                </div>
                <ResumeSummarySugggestions resume={resume} />
            </BodySection>
        )
    } else {
        return (
            <BodySection>
                <div>
                    {resume?.summary}
                    &nbsp;|&nbsp;<a className="text-sm" href='' onClick={(e) => { e.preventDefault(); setEditSummary(true) } }>Edit</a>
                </div>
                <ResumeSummarySugggestions resume={resume} />
            </BodySection>
        )
    }
}