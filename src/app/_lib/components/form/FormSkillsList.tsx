'use client'

import { useFormStatus } from 'react-dom'
import { JobDescriptionSkills } from '@/app/_data/job-description-skill'
import IconCheckCircle from '@/app/_icons/check-circle'

type Props = {
    skills?: JobDescriptionSkills
}

export default function FormSkillsList(props: Props) {
    const { pending } = useFormStatus()

    if (!pending) {
        return (
            <div className="flex flex-wrap">
                {props?.skills?.map((pair, index) => {
                    return <div key={index}>
                        {pair.usedInResume
                            ?
                                <span className="rounded-md bg-green-400 text-white pr-2 pl-2 mr-2 mb-2 flex" key={index}>
                                    <IconCheckCircle />&nbsp;<strong>{pair.skill}</strong> ({pair.mentions})
                                </span>
                            :
                                <span className="rounded-md bg-slate-400 text-black pr-2 pl-2 mr-2 mb-2" key={index}>
                                    <strong>{pair.skill}</strong> ({pair.mentions})
                                </span>
                        }
                    </div>
                })}
            </div>
        )
    }
}