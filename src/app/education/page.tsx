'use server';

import { getEducations } from './actions'
import { auth } from '@/app/auth';
import EducationForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function EducationPage() {
    const session = await auth()
    const educations = await getEducations()

    if (session && session.user) {
        return (
            <EducationForm educations={educations} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
