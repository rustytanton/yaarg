'use server';

import { getEducations } from '../_data/education';
import { auth } from '@/app/auth';
import EducationForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function EducationPage() {
    const session = await auth()

    if (session?.user) {
        const educations = await getEducations(session.user.id as string)
        return (
            <EducationForm educations={educations} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
