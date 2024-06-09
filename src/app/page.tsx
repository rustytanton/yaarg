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
          {/* <li>
            <a href="">Manage my work experiences</a>
          </li>
          <li>
            <a href="">Manage my skills</a>
          </li>
          <li>
            <a href="">Create a new Resume</a>
          </li> */}
        </ul>
      </section>
    )
  } else {
    return (
      <div className="p-10">Please login to see this page</div>
    )
  }
  
}
