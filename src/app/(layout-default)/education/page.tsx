'use server';

import { Education, EducationService } from '@/app/_data/education';
import { auth } from '@/app/auth';
import EducationForm from './form';
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';
import Heading2 from '@/app/_lib/components/headings/Heading2';
import PageFooter from '@/app/_lib/components/PageFooter';

export default async function EducationPage() {
    const session = await auth()
    const educationService = new EducationService()

    if (session?.user) {
        const educations = await educationService.getAllByUserId(session.user.id as string) as Education[]
        return (
            <>
                <Heading2>Education</Heading2>
                <EducationForm educations={educations} />
                <PageFooter />
            </>
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
