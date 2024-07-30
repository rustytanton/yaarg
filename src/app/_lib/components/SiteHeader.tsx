import Link from 'next/link'
import SignOut from "./SignOut"
import { auth } from '@/app/auth'
import Image from 'next/image'
import SignIn from './SignIn'
import ButtonPrimary from './form/ButtonPrimary'

async function SiteHeaderButtons() {
    const session = await auth()
    
    if (session?.user?.id) {
        return (
            <>
                <ButtonPrimary href="/resume" target="_top">Create New Resume</ButtonPrimary>
                <SignOut />
            </>
        )
    } else {
        return (
            <SignIn />
        )
    }
}

export default async function SiteHeader() {
    const session = await auth()

    return (
        <header className="flex justify-center items-center pt-5 mb-10">
            <Image alt="Pirate Avatar" src="/pirate-avatar.png" width={120} height={120} />
            <h1 className="font-bold text-2xl pr-10">
                <Link className="text-white hover:text-orange-500" href="/">YAARG: Yet Another AI R&eacute;sum&eacute; Generator</Link>
            </h1>
            <div className="flex gap-2">
                <SiteHeaderButtons />
            </div>
        </header>
    )
}
