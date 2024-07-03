import { useFormStatus } from 'react-dom'
import Spinner from './Spinner'

type Props = {
    buttonText: string,
    isSubmit?: boolean,
    onClick?: any
    pendingMessage?: string,
    href?: string
}


export default function FormButton ({ buttonText = 'Button', isSubmit = false, onClick = () => {}, pendingMessage = '', href = '' }: Props) {
    const { pending } = useFormStatus()

    if (isSubmit && pending) {
        return (
            <>
                <Spinner /> {pendingMessage}
            </>
        )
    } else if (href) {
        return (
            <a
                className="m-2 p-1 bg-gray-200 text-black block"
                href={href}
                onClick={onClick}
            >
                {buttonText}
            </a>
        )
    } else {
        return (
            <button
                className="m-2 p-1 bg-gray-200 text-black block"
                type={isSubmit ? 'submit' : 'button'}
                onClick={onClick}
            >
                {buttonText}
            </button>
        )
    }
}