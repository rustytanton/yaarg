'use server'

import prisma from '@/app/db'

export default async function ResumesPage() {
    const resumes = await prisma.resume.findMany()

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
                            <td className="pr-5"><a href={ "/resume/" + resume.id }>View/Edit</a></td>
                            <td><a href={ "/resume/" + resume.id + "/delete" }>Delete</a></td> 
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
}