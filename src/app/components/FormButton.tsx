import { useFormStatus } from 'react-dom'
import Spinner from './Spinner'

type Props = {
    buttonText: string,
    isSubmit?: boolean,
    onClick?: any
    pendingMessage?: string
}


export default function FormButton ({ buttonText = 'Button', isSubmit = false, onClick = () => {}, pendingMessage = '' }: Props) {
    const { pending } = useFormStatus()

    if (isSubmit && pending) {
        return (
            <>
                <Spinner /> {pendingMessage}
            </>
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