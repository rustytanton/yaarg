import SignInGoogle from './SignInGoogle'
import SignOut from "./SignOut"
import { auth } from '../auth'
import Image from 'next/image'

export default async function SiteHeader() {
    const session = await auth()

    return (
        <header className="flex items-center p-10">
            <Image alt="Pirate Avatar" src="/pirate-avatar.png" width={120} height={120} />
            <h1 className="pr-10">
                <a href="/">YAARG (Yet Another AI R&eacute;sum&eacute; Generator)</a>
            </h1>
            <div>
                {session && session.user
                ? <SignOut />
                : <SignInGoogle />
                }
            </div>
        </header>
    )
}
