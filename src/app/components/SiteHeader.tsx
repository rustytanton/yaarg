import SignInGoogle from './SignInGoogle'
import SignOut from "./SignOut"
import { auth } from '../auth'

export default async function SiteHeader() {
    const session = await auth()

    return (
        <header className="flex p-10">
            <h1 className="pr-10"><a href="/">YAARG (Yet Another AI Resume Generator)</a></h1>
            <div>
                {session && session.user
                ? <SignOut />
                : <SignInGoogle />
                }
            </div>
        </header>
    )
}
