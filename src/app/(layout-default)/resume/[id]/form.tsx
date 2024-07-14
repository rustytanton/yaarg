'use client'

import { ResumeDTO } from "@/app/_data/resume"
import { ResumeFormState } from "./types"
import { useFormState } from "react-dom"
import { handleFormChange } from "./actions"
import FormButton from "@/app/_lib/components/FormButton"
import { useState } from "react"
import FormSkillsList from "@/app/_lib/components/FormSkillsList"
import Heading3 from "@/app/_lib/components/Heading3"
import ShowHideText from "@/app/_lib/components/ShowHideText"
import BodySection from "@/app/_lib/components/BodySection"
import ResumeContainer from "@/app/_lib/components/resume/ResumeContainer"
import ResumeHeader from "@/app/_lib/components/resume/ResumeHeader"
import { UserDTO } from "@/app/_data/user"
import { JobDTOs } from "@/app/_data/job"
import ResumeSummary from "@/app/_lib/components/resume/ResumeSummary"
import ResumeWorkExperience from "@/app/_lib/components/resume/ResumeWorkExperience"
import ResumeEducation from "@/app/_lib/components/resume/ResumeEducation"
import { EducationDTOs } from "@/app/_data/education"
import BodyParagraphSmall from "@/app/_lib/components/body/BodyParagraphSmall"
import Heading1 from "@/app/_lib/components/headings/Heading1"
import BodyPre from "@/app/_lib/components/body/BodyPre"
import ResumeButtons from "@/app/_lib/components/resume/ResumeButtons"
import { redirect } from "next/navigation"

type Props = {
    resume: ResumeDTO
}

const initialState: ResumeFormState = {
    loadSuggestions: false,
    message: ''
}

export default function ResumeForm(props: Props) {
    const [state, formAction] = useFormState(handleFormChange, {
        ...initialState,
        resume: props.resume
    })

    const [suggestions, setSuggestions] = useState(false)

    async function formActionWrapper(formData: FormData) {
        await formAction(formData)

        // @todo this is slightly hacky
        redirect('/resume/' + state.resume?.id + '?' + new Date().getTime())
    }

    return (
        <form action={formActionWrapper}>
            <BodySection>
                <Heading1>Resume - {state.resume?.employer}</Heading1>
            </BodySection>
            <BodySection>
                <Heading3>Job Description</Heading3>
                <ShowHideText isHidden={true}>
                    <BodyPre>{state.resume?.jobDescription?.text}</BodyPre>
                </ShowHideText>
            </BodySection>
            <BodySection>
                <Heading3>Skills Mentioned in Job Description</Heading3>
                <BodyParagraphSmall>You can see how many skills are mentioned in your resume by loading AI suggestions below</BodyParagraphSmall>
                <FormSkillsList skills={state.resume?.jobDescription?.skills} />
            </BodySection>
            <ResumeButtons>
                <FormButton onClick={() => { setSuggestions(true) }} buttonText="Load AI Suggestions" isSubmit={true} pendingMessage="Analyzing with ChatGPT, this could take a few moments..." />
                <FormButton href={"/print/resume/" + state.resume?.id} buttonText="Print" target="_blank" />
            </ResumeButtons>
            <ResumeContainer>
                <ResumeHeader user={state.resume?.user as UserDTO} />
                <ResumeSummary resume={state.resume as ResumeDTO} />
                <ResumeWorkExperience jobs={state.resume?.jobs as JobDTOs} resumeId={Number(state.resume?.id)} />
                <ResumeEducation educations={state.resume?.educations as EducationDTOs} />
            </ResumeContainer>
            {suggestions ? <input name="suggestions" type="hidden" value="true" /> : '' }
        </form>
    )
}