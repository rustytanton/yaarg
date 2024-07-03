import { auth } from './auth'

export default async function Home() {
  const session = await auth()

  if (session && session.user) {
    return (
      <section className="p-10">
        <p>I want to:</p>
        <ul>
          <li>
            <a href="/contact-info">Manage my contact info</a>
          </li>
          <li>
            <a href="/education">Manage my education and credentials</a>
          </li>
          <li>
            <a href="/jobs">Manage my jobs</a>
          </li>
          <li>
            <a href="/resume">Create a new Resume</a>
          </li>
          <li>
            <a href="/resumes">View Resumes</a>
          </li>
          <li>
            <a href="/chatgpt-test">DEV: ChatGPT Test Page</a>
          </li>
        </ul>
      </section>
    )
  } else {
    return (
      <div className="p-10 w-1/2">
        <p className="pb-5">Welcome! After you sign in with a Google account, you can use this tool to build resumes for jobs.</p>
        <p className="pb-5">As you create more resumes, the tool will use experience and other information you&apos;ve entered into past resumes to suggest experience bullet points customized for the job you&apos;re applying for.</p>
        <p className="pb-5">For now the tool is limited to approved Google accounts, email <a href="mailto:rusty.tanton@gmail.com">rusty.tanton@gmail.com</a> for access. Thanks!</p>
      </div>
    )
  }
  
}
