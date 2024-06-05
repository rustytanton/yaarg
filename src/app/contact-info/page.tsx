import { User } from '../../../node_modules/.prisma/client'
import prisma from '../db'

export default async function ContactInfoPage() {
    async function postContactInfo(formData: FormData) {
        'use server'
        // @todo seems like there should be a more concise way to extract this data
        const user: User = {
            id: 1,
            firstName: formData.get('firstName')?.toString() || '',
            lastName: formData.get('lastName')?.toString() || '',
            emailAddress: formData.get('emailAddress')?.toString() || '',
            phoneNumber: formData.get('phoneNumber')?.toString() || '',
            website: formData.get('website')?.toString() || '',
            github: formData.get('github')?.toString() || '',
            linkedIn: formData.get('linkedIn')?.toString() || ''
        }

        await prisma.user.upsert({
            where: { id: 1 },
            update: { ...user },
            create: { ...user },
        })

        return {
            message: 'Saved updated contact information'
        }
    }

    async function getContactInfo() {
        const user = await prisma.user.findFirst({
            where: { id: 1 }
        })
        return user || {}
    }

    const ci: User = await getContactInfo() as User
    
    return (
        <form action={postContactInfo} className="w-1/2 flex flex-wrap pl-10">
            <label className="w-full flex p-2">
                <span className="w-48">First Name:</span> <input className="block text-black w-1/2" type="text" name="firstName" defaultValue={ci.firstName || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Last Name:</span> <input className="block text-black w-1/2" type="text" name="lastName" defaultValue={ci.lastName || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Email Address:</span> <input className="block text-black w-1/2" type="email" name="emailAddress" defaultValue={ci.emailAddress || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Phone Number:</span> <input className="block text-black w-1/2" type="text" name="phoneNumber" defaultValue={ci.phoneNumber || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Website:</span> <input className="block text-black w-1/2" type="url" name="website" defaultValue={ci.website || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">LinkedIn URL:</span> <input className="block text-black w-1/2" type="url" name="linkedIn" defaultValue={ci.linkedIn || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Github URL:</span> <input className="block text-black w-1/2" type="url" name="github" defaultValue={ci.github || ''} />
            </label>
            <input className="m-2 p-1 bg-gray-200 text-black" type="submit" value="Submit" />
        </form>
    )
}
