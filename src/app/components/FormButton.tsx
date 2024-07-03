import { useFormStatus } from 'react-dom'
import Spinner from './Spinner'


export default function FormButton ({ buttonText = 'Button', isSubmit = false, onClick = () => {} }) {
    const { pending } = useFormStatus()

    if (pending) {
        return (
            <Spinner />
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