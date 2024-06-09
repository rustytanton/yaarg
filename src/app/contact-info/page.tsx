'use server';

import ContactInfoForm from './form';
import { auth } from '../auth'
import { User } from '@prisma/client';

export default async function ContactInfoPage() {
    const session = await auth()

    if (session && session.user) {
        return (
            <ContactInfoForm user={session.user as User} />
        )
    } else {
        return (
            <div className="p-10">Please login to see this page</div>
        )
    }
}
