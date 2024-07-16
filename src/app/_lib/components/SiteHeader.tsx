import Link from 'next/link'
import SignOut from "./SignOut"
import { auth } from '@/app/auth'
import Image from 'next/image'
import SignIn from './SignIn'

export default async function SiteHeader() {
    const session = await auth()

    return (
        <header className="md:flex items-center text-center p-10">
            <div className="flex justify-center">
                <Image alt="Pirate Avatar" src="/pirate-avatar.png" width={120} height={120} />
            </div>
            <h1 className="m:pr-10">
                <Link href="/">YAARG (Yet Another AI R&eacute;sum&eacute; Generator)</Link>
            </h1>
            <div className="pl-5">
                {session?.user ? <SignOut /> : <SignIn /> }
            </div>
        </header>
    )
}
