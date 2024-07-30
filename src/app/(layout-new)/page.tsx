import { auth } from '../auth'
import IconBriefcase from "@/app/_lib/components/icons/IconBriefcase"
import IconContact from "@/app/_lib/components/icons/IconContact"
import IconDocuments from "@/app/_lib/components/icons/IconDocuments"
import IconEducation from "@/app/_lib/components/icons/IconEducation"
import HomepageTiles from "@/app/_lib/components/homepage/HomepageTiles"
import HomepageTile from "@/app/_lib/components/homepage/HomepageTile"
import HomepageTileHeading from "@/app/_lib/components/homepage/HomepageTileHeading"
import HomepageTileSubheading from "@/app/_lib/components/homepage/HomepageTileSubheading"

export default async function Home() {
  const session = await auth()
  const iconBriefcase = <IconBriefcase />
  const iconContact = <IconContact />
  const iconDocuments = <IconDocuments />
  const iconEducation = <IconEducation />

  if (session && session.user) {
    return (
      <HomepageTiles>
                    
          <HomepageTile href="/contact-info" icon={iconContact}>
              <HomepageTileHeading>Contact Info</HomepageTileHeading>
              <HomepageTileSubheading>Name, email, phone, links</HomepageTileSubheading>
          </HomepageTile>

          <HomepageTile href="/education" icon={iconEducation}>
              <HomepageTileHeading>Education</HomepageTileHeading>
              <HomepageTileSubheading>Degrees and credentials</HomepageTileSubheading>
          </HomepageTile>
          
          <HomepageTile href="/jobs" icon={iconBriefcase}>
              <HomepageTileHeading>Jobs</HomepageTileHeading>
              <HomepageTileSubheading>Places you&apos;ve worked</HomepageTileSubheading>
          </HomepageTile>

          <HomepageTile href="/resumes" icon={iconDocuments}>
              <HomepageTileHeading>R&eacute;sum&eacute;s</HomepageTileHeading>
              <HomepageTileSubheading>Past r&eacute;sum&eacute;s here</HomepageTileSubheading>
          </HomepageTile>

      </HomepageTiles>
    )
  } else {
    return (
      <div className="flex justify-center">
        <div className="md:w-1/4">
          <p className="pb-5">Welcome! After you sign in with a valid email address, you can use this tool to build resumes for jobs.</p>
          <p className="pb-5">As you create more resumes, the tool will use experience and other information you&apos;ve entered into past resumes to suggest experience bullet points customized for the job you&apos;re applying for.</p>
        </div>
      </div>
    )
  }
  
}
