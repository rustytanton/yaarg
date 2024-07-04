
import { signIn } from "@/app/auth"
import Image from 'next/image'
 
export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">
        <Image alt="Sign in with Google" src="/google-sign-in.svg" width={175} height={40} />
      </button>
    </form>
  )
} 