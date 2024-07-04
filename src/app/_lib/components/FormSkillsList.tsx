'use client'

import { useFormStatus } from 'react-dom'
import { ChatGptSkill } from '@/app/_lib/chatgpt/assistant-skills-extractor'

type Props = {
    skills: ChatGptSkill[]
}

export default function FormSkillsList(props: Props) {
    const { pending } = useFormStatus()

    if (!pending) {
        return (
            <div className="flex flex-wrap">
                {props.skills.map((pair, index) => {
                    return (
                        <span className="rounded-md bg-amber-500 pr-2 pl-2 mr-2 mb-2" key={index}>
                            <strong>{pair.skill}</strong> ({pair.mentions})
                        </span>
                    )
                })}
            </div>
        )
    }
}