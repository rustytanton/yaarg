import Image from "next/image";

export default function Home() {

  return (
      <>
        <p>I want to:</p>
        <ul>
          <li>
            <a href="/contact-info">Manage my contact info</a>
          </li>
          <li>
            <a href="">Manage my work experiences</a>
          </li>
          <li>
            <a href="">Manage my skills</a>
          </li>
          <li>
            <a href="">Manage my education and credentials</a>
          </li>
          <li>
            <a href="">Create a new Resume</a>
          </li>
        </ul>
      </>
  );
}
