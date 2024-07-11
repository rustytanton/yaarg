'use client'

import { useFormStatus } from 'react-dom'
import { JobDescriptionSkillDTOs } from '@/app/_data/job-description-skill'

type Props = {
    skills?: JobDescriptionSkillDTOs
}

export default function FormSkillsList(props: Props) {
    const { pending } = useFormStatus()

    if (!pending) {
        return (
            <div className="flex flex-wrap">
                {props?.skills?.map((pair, index) => {
                    return (
                        <span className="rounded-md bg-slate-400 text-black pr-2 pl-2 mr-2 mb-2" key={index}>
                            <strong>{pair.skill}</strong> ({pair.mentions})
                        </span>
                    )
                })}
            </div>
        )
    }
}