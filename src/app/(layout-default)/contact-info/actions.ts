'use server'

import { UserService } from "../../_data/user";
import { auth } from "../../auth";
import { ContactInfoFormState, ContactInfoFormStatus } from './types'

export async function handleFormChange(prevState: ContactInfoFormState, formData: FormData): Promise<ContactInfoFormState> {
    const session = await auth()
    const userFormId = formData.get('userId')
    const userService = new UserService()
    if (session?.user?.id === userFormId) {
        await userService.update({
            id: userFormId,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            emailAlt: formData.get('emailAlt') as string,
            github: formData.get('github') as string,
            linkedIn: formData.get('linkedIn') as string,
            location: formData.get('location') as string,
            phoneNumber: formData.get('phoneNumber') as string,
            website: formData.get('website') as string,
        })
        return {
            message: "User updated",
            status: ContactInfoFormStatus.SUCCESS,
            statusUpdated: new Date()
        }
    } else {
        return {
            message: "Unable to update user",
            status: ContactInfoFormStatus.ERROR,
            statusUpdated: new Date()
        }
    }
}