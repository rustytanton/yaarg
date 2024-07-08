'use server'

import prisma from '@/app/db'
import Link from 'next/link'
import { auth } from '@/app/auth'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage'

export default async function ResumesPage() {
    const session = await auth()
    if (session && session.user) {
        const resumes = await prisma.resume.findMany({
            where: {
                userId: session.user.id
            }
        })
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