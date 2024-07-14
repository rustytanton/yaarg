import { UserDTO } from "@/app/_data/user"

type Props = {
    user: UserDTO | undefined
}

export default function ResumePrintHeader({ user }: Props) {
    return (
        <header className="mb-10">
            <div className="flex">
                <div className="pr-10">
                    <h1 className="text-4xl mb-2">{user?.firstName} {user?.lastName}</h1>
                    <div className="mb-2">{user?.location} | {user?.phoneNumber} | {user?.email}</div>
                </div>
                <div>
                    <div>{user?.github}</div>
                    <div>{user?.linkedIn}</div>
                    <div>{user?.website}</div>
                </div>
            </div>
        </header>
    )
}