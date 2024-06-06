'use client'

import { useFormState } from 'react-dom'
import { upsertUser } from './actions'
import { User } from '@prisma/client'
import FormMessage from '../components/FormMessage'
import FormInputText from '../components/FormInputText'
import FormSubmitButton from '../components/FormSubmitButton'

const initialState = {
    message: ''
}

export default function ContactInfoForm(user: User) {

    const [state, formAction] = useFormState(upsertUser, initialState)

    return (
        <form action={formAction} className="w-1/2 flex flex-wrap pl-10">
            <FormMessage message={state?.message} />
            <FormInputText label="First Name:" inputName="firstName" defaultValue={user.firstName || ''} />
            <FormInputText label="Last Name:" inputName="lastName" defaultValue={user.lastName || ''} />
            <FormInputText label="Location:" inputName="location" defaultValue={user.location || ''} />
            <FormInputText label="Email:" inputName="emailAddress" inputType="email" defaultValue={user.emailAddress || ''} />
            <FormInputText label="Phone Number:" inputName="phoneNumber" defaultValue={user.phoneNumber || ''} />
            <FormInputText label="Website:" inputName="website" defaultValue={user.website || ''} />
            <FormInputText label="LinkedIn URL:" inputName="linkedIn" defaultValue={user.linkedIn || ''} />
            <FormInputText label="Github URL:" inputName="github" defaultValue={user.github || ''} />
            <FormSubmitButton />
        </form>
    )
}