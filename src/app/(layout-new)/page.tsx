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
          <p className="pb-5 mb-10">As you create more resumes, the tool will use experience and other information you&apos;ve entered into past resumes to suggest experience bullet points customized for the job you&apos;re applying for.</p>
          <div className="LoomEmbed">
            <iframe
              src="https://www.loom.com/embed/ed4a854ec2c7408dae87f993b57b9779?sid=04fefc13-cb39-4fc0-931f-397fb1355057"
              frameBorder="0"
              allowFullScreen
            >
            </iframe>
          </div>
        </div>
      </div>
    )
  }
  
}
