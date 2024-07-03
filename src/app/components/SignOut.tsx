import { signOut } from "@/app/auth"
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: '/', redirect: true })
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}