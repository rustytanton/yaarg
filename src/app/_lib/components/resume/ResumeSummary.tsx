import { Resume } from "@/app/_data/resume"
import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import FormButton from "@/app/_lib/components/form/FormButton"
import ResumeSummarySugggestions from "./ResumeSummarySuggestions"
import BodySection from "@/app/_lib/components/body/BodySection"

type Props = {
    resume: Resume
}

export default function ResumeSummary({ resume }: Props) {
    const [editSummary, setEditSummary] = useState(false)

    if (editSummary) {
        return (
            <BodySection>
                <div>
                    <TextareaAutosize
                        className="p-2 w-full h-10 resize-none outline-0 border-2 border-slate-200"
                        name='summary'
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >{resume?.summary}</TextareaAutosize>
                    <div className="flex gap-2">
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
                    {resume?.summary ? <span className="hidden md:inline">&nbsp;|&nbsp;</span> : '' }
                    <a className="block md:inline text-sm" href='' onClick={(e) => { e.preventDefault(); setEditSummary(true) } }>
                        {resume?.summary ? 'Edit' : 'Add a summary' }
                    </a>
                </div>
                <ResumeSummarySugggestions resume={resume} />
            </BodySection>
        )
    }
}