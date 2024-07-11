import { signIn } from "@/app/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button className="m-2 p-1 bg-gray-200 text-black" type="submit">Sign In</button>
    </form>
  )
} 