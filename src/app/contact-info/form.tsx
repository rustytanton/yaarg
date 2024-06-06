'use client'

import { useFormState } from 'react-dom'
import { upsertUser } from './actions'
import { User } from '@prisma/client'

const initialState = {
    message: ''
}

export default function ContactInfoForm(user: User) {

    const [state, formAction] = useFormState(upsertUser, initialState)

    return (
        <form action={formAction} className="w-1/2 flex flex-wrap pl-10">
            {state?.message ? <div className="bg-green-300 text-black p-2">{state?.message}</div> : '' }
            <label className="w-full flex p-2">
                <span className="w-48">First Name:</span> <input className="block text-black w-1/2" type="text" name="firstName" defaultValue={user.firstName || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Last Name:</span> <input className="block text-black w-1/2" type="text" name="lastName" defaultValue={user.lastName || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Location:</span> <input className="block text-black w-1/2" type="text" name="location" defaultValue={user.location || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Email Address:</span> <input className="block text-black w-1/2" type="email" name="emailAddress" defaultValue={user.emailAddress || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Phone Number:</span> <input className="block text-black w-1/2" type="text" name="phoneNumber" defaultValue={user.phoneNumber || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Website:</span> <input className="block text-black w-1/2" type="url" name="website" defaultValue={user.website || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">LinkedIn URL:</span> <input className="block text-black w-1/2" type="url" name="linkedIn" defaultValue={user.linkedIn || ''} />
            </label>
            <label className="w-full flex p-2">
                <span className="w-48">Github URL:</span> <input className="block text-black w-1/2" type="url" name="github" defaultValue={user.github || ''} />
            </label>
            <input className="m-2 p-1 bg-gray-200 text-black" type="submit" value="Submit" />
        </form>
    )
}