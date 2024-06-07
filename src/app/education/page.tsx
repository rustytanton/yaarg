'use server';

import { getEducations } from './actions'
import EducationForm from './form';

export default async function EducationPage() {

    const educations = await getEducations()

    return (
        <EducationForm educations={educations} />
    )
}
