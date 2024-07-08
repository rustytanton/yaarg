'use server';

import ContactInfoForm from './form';
import { auth } from '@/app/auth'
import { User } from '@prisma/client';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function ContactInfoPage() {
    const session = await auth()
    if (session) {
        return (
            <ContactInfoForm user={session.user as User} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
