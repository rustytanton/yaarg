'use client'

import { Resume } from "@/app/_data/resume"
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
import { User } from "@/app/_data/user"
import { Jobs } from "@/app/_data/job"
import ResumeSummary from "@/app/_lib/components/resume/ResumeSummary"
import ResumeWorkExperience from "@/app/_lib/components/resume/ResumeWorkExperience"
import ResumeEducation from "@/app/_lib/components/resume/ResumeEducation"
import { Educations } from "@/app/_data/education"
import BodyParagraphSmall from "@/app/_lib/components/body/BodyParagraphSmall"
import Heading1 from "@/app/_lib/components/headings/Heading1"
import BodyPre from "@/app/_lib/components/body/BodyPre"
import ResumeButtons from "@/app/_lib/components/resume/ResumeButtons"

type Props = {
    resume: Resume,
    resumeCount: number
}

const initialState: ResumeFormState = {
    loadSuggestions: false,
    message: ''
}

export default function ResumeForm(props: Props) {
    const [state, formAction, third] = useFormState(handleFormChange, {
        ...initialState,
        resume: props.resume
    })

    return (
        <form action={formAction}>
            <BodySection>
                <Heading1>Resume - {state.resume?.employer}</Heading1>
            </BodySection>
            {props.resumeCount < 2
                ?
                    <BodyParagraphSmall>
                        Since this is your first resume, you will need to enter experience
                        manually by clicking the &quot;Edit&quot; link next to each job title.
                        After you have added experience to one resume, you will have the option
                        on future resumes to populate experience based on past resumes.
                    </BodyParagraphSmall>
                :
                    ''
            }
            <ResumeButtons>
                <FormButton
                    buttonText="Load ChatGPT Suggestions"
                    isSubmit={true}
                    pendingMessage="Analyzing with ChatGPT, this could take a few moments..."
                />
                <FormButton href={"/print/resume/" + state.resume?.id} buttonText="Print" target="_blank" />
            </ResumeButtons>
            <ResumeContainer>
                <ResumeHeader user={state.resume?.user as User} />
                <ResumeSummary resume={state.resume as Resume} />
                <ResumeWorkExperience jobs={state.resume?.jobs as Jobs} resumeId={Number(state.resume?.id)} />
                <ResumeEducation educations={state.resume?.educations as Educations} />
            </ResumeContainer>
            <BodySection>
                <Heading3>Job Description</Heading3>
                <ShowHideText isHidden={true}>
                    <BodyPre>{state.resume?.jobDescription?.text}</BodyPre>
                </ShowHideText>
            </BodySection>
            <BodySection>
                <Heading3>Skills Mentioned in Job Description</Heading3>
                <BodyParagraphSmall>
                    The skills below were mentioned in the job description.
                    After you ask for AI suggestions, any you mentioned in your resume
                    will be highlgighted in green.
                </BodyParagraphSmall>
                <FormSkillsList skills={state.resume?.jobDescription?.skills} />
            </BodySection>
        </form>
    )
}