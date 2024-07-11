import Link from 'next/link'
import SignOut from "./SignOut"
import { auth } from '@/app/auth'
import Image from 'next/image'
import SignIn from './SignIn'

export default async function SiteHeader() {
    const session = await auth()

    return (
        <header className="flex items-center p-10">
            <Image alt="Pirate Avatar" src="/pirate-avatar.png" width={120} height={120} />
            <h1 className="pr-10">
                <Link href="/">YAARG (Yet Another AI R&eacute;sum&eacute; Generator)</Link>
            </h1>
            <div>
                {session?.user ? <SignOut /> : <SignIn /> }
            </div>
        </header>
    )
}
