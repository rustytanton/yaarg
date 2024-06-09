'use server';

import { getEducations } from './actions'
import { auth } from '../auth';
import EducationForm from './form';

export default async function EducationPage() {
    const session = await auth()
    const educations = await getEducations()

    if (session && session.user) {
        return (
            <EducationForm educations={educations} />
        )
    } else {
        return (
            <div className="p-10">Please login to see this page</div>
        )
    }
}
