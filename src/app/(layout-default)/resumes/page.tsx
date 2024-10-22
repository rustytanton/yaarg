'use server'

import Link from 'next/link'
import { auth } from '@/app/auth'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage'
import { Resume, ResumeService } from '@/app/_data/resume'
import Heading2 from '@/app/_lib/components/headings/Heading2'
import PageFooter from '@/app/_lib/components/PageFooter'


export default async function ResumesPage() {
    const session = await auth()
    if (session && session.user) {
        const resumeService = new ResumeService()
        const resumes = await resumeService.getAllByUserId(session.user.id as string) as Resume[]
        if (resumes.length) {
            return (
                <>
                    <Heading2>R&eacute;sum&eacute;s</Heading2>
                    <table className="mb-10">
                        <thead>
                            <tr>
                                <th className="text-left">Employer</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {resumes.map((resume, index) => {
                            return (
                                <tr key={index}>
                                    <td className="pr-10">
                                        {resume.employer}
                                    </td>
                                    <td className="pr-5"><Link href={ "/resume/" + resume.id }>View/Edit</Link></td>
                                    <td><Link href={ "/resume/" + resume.id + "/delete" }>Delete</Link></td> 
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <PageFooter />
                </>
            )
        } else {
            return (
                <div>No resumes found</div>
            )
        }
    } else {
        return (
            <NoAccessMessage />
        )
    }
}