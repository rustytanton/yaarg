import ResumeTitle from "./ResumeTitle"
import { UserDTO } from "@/app/_data/user"

type Props = {
    user: UserDTO
}

export default function ResumeHeader({ user }: Props) {
    return (
        <header>
            <ResumeTitle>{user.firstName} {user.lastName}</ResumeTitle>
            <div className="mb-5">
                <div className="text-sm">
                    {user.phoneNumber} |&nbsp;
                    {user.email} |&nbsp;
                    {user.location}
                </div>
                <div className="text-sm pt-2">
                    <div>{user.linkedIn}</div>
                    <div>{user.github}</div>
                </div>
            </div>
        </header>
    )
}