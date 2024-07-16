'use client'

import { useFormState } from 'react-dom'
import { handleFormChange } from './actions'
import FormMessage from '@/app/_lib/components/FormMessage'
import FormInputText from '@/app/_lib/components/FormInputText'
import FormButton from '@/app/_lib/components/FormButton'
import { ContactInfoFormState } from './types'
import { User } from '../../_data/user'
import ActionsCentered from '@/app/_lib/components/containers/ActionsCentered'
import RequiredInfo from '@/app/_lib/components/form/RequiredInfo'

const initialState: ContactInfoFormState = {
    message: ''
}

type Props = {
    user: User
}

export default function ContactInfoForm(props: Props) {

    const [state, formAction] = useFormState(handleFormChange, initialState)
    const user = props.user

    return (
        <form action={formAction} className="pl-10 pr-10 w-3/4">
            <FormMessage message={state?.message} />
            <p className="mb-10">If you specify an alternative email address, it will be used in place of your account email (which can&apos;t be changed) when generating resumes.</p>
            <RequiredInfo />
            <FormInputText label="First Name:" inputName="firstName" defaultValue={user.firstName || ''} required={true} />
            <FormInputText label="Last Name:" inputName="lastName" defaultValue={user.lastName || ''} required={true} />
            <FormInputText label="Location:" inputName="location" defaultValue={user.location || ''} required={true} />
            <FormInputText label="Email:" inputName="email" inputType="email" defaultValue={user.email || ''} isDisabled={true} />
            <FormInputText label="Alternative Email:" inputName="emailAlt" inputType="email" defaultValue={user.emailAlt || ''} />
            <FormInputText label="Phone Number:" inputName="phoneNumber" defaultValue={user.phoneNumber || ''} />
            <FormInputText label="Website:" inputName="website" defaultValue={user.website || ''} />
            <FormInputText label="LinkedIn URL:" inputName="linkedIn" defaultValue={user.linkedIn || ''} />
            <FormInputText label="Github URL:" inputName="github" defaultValue={user.github || ''} />
            <input type="hidden" name="userId" value={user.id} />
            <ActionsCentered>
                <FormButton buttonText="Submit" isSubmit={true} />
            </ActionsCentered>
        </form>
    )
}