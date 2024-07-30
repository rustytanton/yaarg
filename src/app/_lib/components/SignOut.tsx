import { signOut } from "@/app/auth"
import ButtonPrimary from "./form/ButtonPrimary"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: '/', redirect: true })
      }}
    >
      <ButtonPrimary type="submit">Sign Out</ButtonPrimary>
    </form>
  )
}