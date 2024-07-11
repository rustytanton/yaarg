'use server'

import Link from 'next/link'
import { auth } from '@/app/auth'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage'
import { getResumes } from '../_data/resume'


export default async function ResumesPage() {
    const session = await auth()
    if (session && session.user) {
        const resumes = await getResumes(session.user.id as string)
        if (resumes.length) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th className="text-left">Resume</th>
                            <th className="text-left">Employer</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {resumes.map((resume, index) => {
                        return (
                            <tr key={index}>
                                <td className="pr-5">
                                    Resume {resume.id}
                                </td>
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