'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../db'
import { auth } from '../auth'

export async function upsertUser(prevState: any, formData: FormData) { 
    const session = await auth()
    if (session && session.user) {
        const payload = {
            id: session.user.id as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            phoneNumber: formData.get('phoneNumber') as string,
            website: formData.get('website') as string,
            github: formData.get('github') as string,
            linkedIn: formData.get('linkedIn') as string,
            location: formData.get('location') as string
        }
    
        await prisma.user.update({
            where: { id: session.user.id },
            data: { ...payload }
        })
    
        revalidatePath('/contact-info')
    
        return {
            message: 'User information updated'
        }
    } else {

    }
}
