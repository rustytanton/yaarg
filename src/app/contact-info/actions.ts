'use server'

import { revalidatePath } from 'next/cache'
import prisma from '../db'
import { User } from '@prisma/client'

export async function upsertUser(prevState: any, formData: FormData) {
    const user: User = {
        id: 1,
        firstName: formData.get('firstName')?.toString() || '',
        lastName: formData.get('lastName')?.toString() || '',
        emailAddress: formData.get('emailAddress')?.toString() || '',
        phoneNumber: formData.get('phoneNumber')?.toString() || '',
        website: formData.get('website')?.toString() || '',
        github: formData.get('github')?.toString() || '',
        linkedIn: formData.get('linkedIn')?.toString() || '',
        location: formData.get('location')?.toString() || ''
    }

    await prisma.user.upsert({
        where: { id: 1 },
        update: { ...user },
        create: { ...user },
    })

    revalidatePath('/contact-info')

    return {
        message: 'User information updated'
    }
}

export async function getUser() {
    const user = await prisma.user.findFirst({
        where: { id: 1 }
    })
    return user || {} as User
}