'use client'

import { useFormStatus } from 'react-dom'
import { ChatGptSkill } from '../chatgpt/assistant-skills-extractor'

type Props = {
    skills: ChatGptSkill[]
}

export default function FormSkillsList(props: Props) {
    const { pending } = useFormStatus()

    if (!pending) {
        return (
            <div className="pt-10">
                {props.skills.map((pair, index) => {
                    return (
                        <div key={index}>
                            <strong>{pair.skill}</strong> ({pair.mentions})
                        </div>
                    )
                })}
            </div>
        )
    }
}