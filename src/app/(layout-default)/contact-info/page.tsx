'use server'

import { User, UserService } from '@/app/_data/user';
import { auth } from '@/app/auth';
import ContactInfoForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';
import Heading2 from '@/app/_lib/components/headings/Heading2';
import PageFooter from '@/app/_lib/components/PageFooter';

export default async function ContactInfoPage() {
    const session = await auth()
    if (session?.user) {
        const userService = new UserService()
        const user = await userService.get(session.user.id as string) as User
        return (
            <>
                <Heading2>Contact Info</Heading2>
                <ContactInfoForm user={user} />
                <PageFooter />
            </>
        )
    } else {
        return <NoAccessMessage />
    }
}