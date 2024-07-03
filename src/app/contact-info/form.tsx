'use client'

import { useFormState } from 'react-dom'
import { upsertUser } from './actions'
import { User } from '@prisma/client'
import FormMessage from '@/app/components/FormMessage'
import FormInputText from '@/app/components/FormInputText'
import FormButton from '@/app/components/FormButton'

const initialState = {
    message: ''
}

type Props = {
    user: User
}

export default function ContactInfoForm(props: Props) {

    const [state, formAction] = useFormState(upsertUser, initialState)
    const user = props.user

    return (
        <form action={formAction} className="pl-10 w-1/2">
            <FormMessage message={state?.message} />
            <p className="mb-10">If you specify an alternative email address, it will be used in place of your account email (which can&apos;t be changed) when generating resumes.</p>
            <FormInputText label="First Name:" inputName="firstName" defaultValue={user.firstName || ''} />
            <FormInputText label="Last Name:" inputName="lastName" defaultValue={user.lastName || ''} />
            <FormInputText label="Location:" inputName="location" defaultValue={user.location || ''} />
            <FormInputText label="Email:" inputName="email" inputType="email" defaultValue={user.email || ''} isDisabled={true} />
            <FormInputText label="Alternative Email:" inputName="emailAlt" inputType="email" defaultValue={user.emailAlt || ''} />
            <FormInputText label="Phone Number:" inputName="phoneNumber" defaultValue={user.phoneNumber || ''} />
            <FormInputText label="Website:" inputName="website" defaultValue={user.website || ''} />
            <FormInputText label="LinkedIn URL:" inputName="linkedIn" defaultValue={user.linkedIn || ''} />
            <FormInputText label="Github URL:" inputName="github" defaultValue={user.github || ''} />
            <FormButton buttonText="Submit" isSubmit={true} />
        </form>
    )
}