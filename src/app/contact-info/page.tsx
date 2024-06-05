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
        <form action={postContactInfo}>
            <label>
                First Name: <input type="text" name="firstName" defaultValue={ci.firstName || ''} />
            </label>
            <label>
                Last Name: <input type="text" name="lastName" defaultValue={ci.lastName || ''} />
            </label>
            <label>
                Email Address: <input type="email" name="emailAddress" defaultValue={ci.emailAddress || ''} />
            </label>
            <label>
                Phone Number: <input type="text" name="phoneNumber" defaultValue={ci.phoneNumber || ''} />
            </label>
            <label>
                Website: <input type="url" name="website" defaultValue={ci.website || ''} />
            </label>
            <label>
                LinkedIn URL: <input type="url" name="linkedIn" defaultValue={ci.linkedIn || ''} />
            </label>
            <label>
                Github URL: <input type="url" name="github" defaultValue={ci.github || ''} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}
