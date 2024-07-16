import ResumeTitle from "./ResumeTitle"
import { User } from "@/app/_data/user"

type Props = {
    user: User
}

export default function ResumeHeader({ user }: Props) {
    return (
        <header>
            <ResumeTitle>{user.firstName} {user.lastName}</ResumeTitle>
            <div className="mb-5">
                <div className="text-sm flex divide-solid divide-x-2 divide-black">
                    {user.location ? <span className="pr-2 pl-2 first:pl-0">{user.location}</span> : ''}
                    {user.phoneNumber ? <span className="pr-2 pl-2 first:pl-0">{user.phoneNumber}</span> : ''}
                    {user.email && !user.emailAlt ? <span className="pr-2 pl-2 first:pl-0">{user.email}</span> : ''}
                    {user.emailAlt ? <span className="pr-2 pl-2 first:pl-0">{user.emailAlt}</span> : ''}
                </div>
                <div className="text-sm pt-2">
                    <div className="break-words">{user.linkedIn}</div>
                    <div className="break-words">{user.github}</div>
                </div>
            </div>
        </header>
    )
}