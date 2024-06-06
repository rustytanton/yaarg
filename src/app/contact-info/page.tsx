'use server';

import { getUser } from './actions'
import ContactInfoForm from './form';

export default async function ContactInfoPage() {

    const user = await getUser()

    return (
        <ContactInfoForm {...user} />
    )
}
