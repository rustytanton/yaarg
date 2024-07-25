'use server'

import { User, UserService } from '@/app/_data/user';
import { auth } from '@/app/auth';
import ContactInfoForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function ContactInfoPage() {
    const session = await auth()
    if (session?.user) {
        const userService = new UserService()
        const user = await userService.get(session.user.id as string) as User
        return (
            <ContactInfoForm user={user} />
        )
    } else {
        return <NoAccessMessage />
    }
}