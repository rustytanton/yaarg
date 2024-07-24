'use server';

import { Education, EducationService } from '@/app/_data/education';
import { auth } from '@/app/auth';
import EducationForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function EducationPage() {
    const session = await auth()
    const educationService = new EducationService()

    if (session?.user) {
        const educations = await educationService.getAllByUserId(session.user.id as string) as Education[]
        return (
            <EducationForm educations={educations} />
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
