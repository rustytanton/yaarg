'use client'

import { useFormState } from 'react-dom'
import { upsertUser } from './actions'
import { User } from '@prisma/client'
import FormMessage from '../components/FormMessage'
import FormInputText from '../components/FormInputText'
import FormButton from '../components/FormButton'

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
        <form action={formAction} className="w-1/2 flex flex-wrap pl-10">
            <FormMessage message={state?.message} />
            <FormInputText label="First Name:" inputName="firstName" defaultValue={user.firstName || ''} />
            <FormInputText label="Last Name:" inputName="lastName" defaultValue={user.lastName || ''} />
            <FormInputText label="Location:" inputName="location" defaultValue={user.location || ''} />
            <FormInputText label="Email:" inputName="email" inputType="email" defaultValue={user.email || ''} isDisabled={true} />
            <FormInputText label="Phone Number:" inputName="phoneNumber" defaultValue={user.phoneNumber || ''} />
            <FormInputText label="Website:" inputName="website" defaultValue={user.website || ''} />
            <FormInputText label="LinkedIn URL:" inputName="linkedIn" defaultValue={user.linkedIn || ''} />
            <FormInputText label="Github URL:" inputName="github" defaultValue={user.github || ''} />
            <FormButton buttonText="Submit" isSubmit={true} />
        </form>
    )
}