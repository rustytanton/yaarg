import { useFormStatus } from "react-dom"
import Spinner from "../Spinner"
import { ChatGptAsyncJobs } from "@/app/_data/chatgpt-async-job"

type Props = {
    children: any,
    asyncJobs?: ChatGptAsyncJobs
}

export default function ResumeButtons({ children, asyncJobs = [] }: Props) {
    const { pending } = useFormStatus()

    if (pending || asyncJobs.length > 0) {
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