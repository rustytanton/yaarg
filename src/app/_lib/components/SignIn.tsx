import { signIn } from "@/app/auth"
import ButtonPrimary from "./form/ButtonPrimary"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <ButtonPrimary type="submit">Sign In</ButtonPrimary>
    </form>
  )
} 