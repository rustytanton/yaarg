import Link from 'next/link'
import { auth } from '../auth'

export default async function Home() {
  const session = await auth()

  if (session && session.user) {
    return (
      <section className="m:p-10">
        <p>I want to:</p>
        <ul>
          <li>
            <Link href="/contact-info">Manage my contact info</Link>
          </li>
          <li>
            <Link href="/education">Manage my education and credentials</Link>
          </li>
          <li>
            <Link href="/jobs">Manage my jobs</Link>
          </li>
          <li>
            <Link href="/resume">Create a new Resume</Link>
          </li>
          <li>
            <Link href="/resumes">View Resumes</Link>
          </li>
        </ul>
      </section>
    )
  } else {
    return (
      <div className="p-10 md:w-1/2">
        <p className="pb-5">Welcome! After you sign in with a valid email address, you can use this tool to build resumes for jobs.</p>
        <p className="pb-5">As you create more resumes, the tool will use experience and other information you&apos;ve entered into past resumes to suggest experience bullet points customized for the job you&apos;re applying for.</p>
      </div>
    )
  }
  
}
