import { useFormStatus } from 'react-dom'
import Spinner from '@/app/_lib/components/Spinner'
import Link from 'next/link'

type Props = {
    buttonText: string,
    isSubmit?: boolean,
    onClick?: any
    pendingMessage?: string,
    href?: string
    target?: string
    id?: string
}


export default function FormButton ({ buttonText = 'Button', isSubmit = false, onClick = () => {}, pendingMessage = '', href = '', target = '', id = '' }: Props) {
    const { pending } = useFormStatus()

    if (isSubmit && pending) {
        return (
            <>
                <Spinner />&nbsp;{pendingMessage}
            </>
        )
    } else if (href) {
        return (
            <Link
                className="pt-2 pb-2 pr-4 pl-4 bg-gray-200 text-black block rounded"
                href={href}
                onClick={onClick}
                target={target}
                id={id}
            >
                {buttonText}
            </Link>
        )
    } else {
        return (
            <button
                className="pt-2 pb-2 pr-4 pl-4 bg-gray-200 text-black block rounded"
                type={isSubmit ? 'submit' : 'button'}
                onClick={onClick}
                id={id}
            >
                {buttonText}
            </button>
        )
    }
}