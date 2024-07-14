'use server'

import { getUser } from '../../_data/user';
import { auth } from '../../auth';
import ContactInfoForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function ContactInfoPage() {
    const session = await auth()
    if (session?.user) {
        const user = await getUser(session.user.id as string)
        return (
            <ContactInfoForm user={user} />
        )
    } else {
        return <NoAccessMessage />
    }
}