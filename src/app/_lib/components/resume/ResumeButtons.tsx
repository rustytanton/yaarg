import { useFormStatus } from "react-dom"
import Spinner from "../Spinner"

type Props = {
    children: any
}

export default function ResumeButtons({ children }: Props) {
    const { pending } = useFormStatus()

    if (pending) {
        return (
            <div className="flex justify-center items-center mb-5 gap-2 flex-col md:flex-row">
                <Spinner /> Loading...
            </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center mb-5 gap-2 flex-col md:flex-row">
                {children}                
            </div>
        )
    }
}