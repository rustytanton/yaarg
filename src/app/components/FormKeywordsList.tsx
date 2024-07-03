import { useFormStatus } from 'react-dom'
import { ChatGptKeyword } from '../chatgpt-test/types'

type Props = {
    keywords: ChatGptKeyword[]
}

export default function FormKeywordsList(props: Props) {
    const { pending } = useFormStatus()

    if (!pending) {
        return (
            <div className="pt-10">
                {props.keywords.map((pair, index) => {
                    return (
                        <div key={index}>
                            <strong>{pair.skill}</strong> ({pair.mentioned})
                        </div>
                    )
                })}
            </div>
        )
    }
}