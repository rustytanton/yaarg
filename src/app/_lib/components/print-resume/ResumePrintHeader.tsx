import { UserDTO } from "@/app/_data/user"

type Props = {
    user: UserDTO | undefined
}

export default function ResumePrintHeader({ user }: Props) {
    return (
        <header className="mb-10">
            <div>
                <div className="pr-10">
                    <h1 className="text-4xl mb-2">{user?.firstName} {user?.lastName}</h1>
                    <div className="mb-2 divide-solid divide-x-2 divide-black">
                        {user?.location ? <span className="pr-2 pl-2 first:pl-0">{user?.location}</span> : '' }                        
                        {user?.phoneNumber ? <span className="pr-2 pl-2 first:pl-0">{user?.phoneNumber}</span> : ''}
                        {user?.email ? <span className="pr-2 pl-2 first:pl-0">{user?.email}</span> : ''}
                    </div>
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