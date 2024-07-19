'use client'

import { Resume } from "@/app/_data/resume"
import { ResumeFormState } from "./types"
import { useFormState } from "react-dom"
import { handleFormChange } from "./actions"
import FormButton from "@/app/_lib/components/form/FormButton"
import { useState } from "react"
import FormSkillsList from "@/app/_lib/components/form/FormSkillsList"
import Heading3 from "@/app/_lib/components/headings/Heading3"
import ShowHideText from "@/app/_lib/components/ShowHideText"
import BodySection from "@/app/_lib/components/body/BodySection"
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
import { ResumeSubmitTypes } from './types'
import { useEffect } from "react"
import { chatGptAsyncJobStatuses } from "@/app/_lib/chatgpt/assistant"

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

    const [submitType, setSubmitType] = useState("")

    async function formActionWrapper(formData: FormData) {
        await formAction(formData)
        setSubmitType("")
    }

    useEffect(() => {
        const checkInterval = setInterval(() => {
            if (!state.resume.chatGptAsyncJobs) {
                return
            }

            for (const asyncJob of state.resume.chatGptAsyncJobs) {
                fetch('/api/chatgpt-async-job/' + asyncJob.id)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === chatGptAsyncJobStatuses.COMPLETE) {
                            // @todo this seems hacky                          
                            const resumeForm = document.getElementById("resumeForm") as HTMLFormElement
                            if (resumeForm) {
                                const formData = new FormData(resumeForm)
                                formData.set('submitType', ResumeSubmitTypes.CHATGPT_ASYNC_JOB)
                                formAction(formData)
                            }
                        } else if (data.status === chatGptAsyncJobStatuses.CANCELLED) {
                            console.log('cancelled')
                        } else if (data.status === chatGptAsyncJobStatuses.FAILED) {
                            console.log('failed')
                        }
                    })
            }
        }, 2500)

        return () => {
            clearInterval(checkInterval)
        }
    }, [formAction, state.resume.chatGptAsyncJobs])

    return (
        <form action={formActionWrapper} id="resumeForm">
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
            <ResumeButtons asyncJobs={state.resume.chatGptAsyncJobs}>
                {props.resumeCount > 1
                    ?
                        <FormButton
                            buttonText="Populate Experience from Past Resumes"
                            isSubmit={true}
                            onClick={() => {
                                setSubmitType(
                                    ResumeSubmitTypes.POPULATE_PAST_EXPERIENCES
                                )
                            }}
                        />
                    : ''
                }
                <FormButton
                    buttonText="Load ChatGPT Suggestions"
                    isSubmit={true}
                    id="resumeFormSubmit"
                    onClick={() => {
                        setSubmitType(
                            ResumeSubmitTypes.CHATGPT_SUGGESTIONS
                        )
                    }}
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
            <input type="hidden" name="submitType" value={submitType} />
        </form>
    )
}