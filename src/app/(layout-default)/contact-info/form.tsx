'use client'

import { useFormState } from 'react-dom'
import { handleFormChange } from './actions'
import FormMessage from '@/app/_lib/components/FormMessage'
import FormInputText from '@/app/_lib/components/FormInputText'
import FormButton from '@/app/_lib/components/FormButton'
import { ContactInfoFormState } from './types'
import { UserDTO } from '../../_data/user'

const initialState: ContactInfoFormState = {
    message: ''
}

type Props = {
    user: UserDTO
}

export default function ContactInfoForm(props: Props) {

    const [state, formAction] = useFormState(handleFormChange, initialState)
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
            <input type="hidden" name="userId" value={user.id} />
            <FormButton buttonText="Submit" isSubmit={true} />
        </form>
    )
}