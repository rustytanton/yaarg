export type ContactInfo = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    website: string
    linkedIn: string
    github: string
}

export default async function ContactInfoPage() {
    async function postContactInfo(formData: FormData) {
        'use server'
        // @todo seems like there should be a more concise way to extract this data
        const ci: ContactInfo = {
            firstName: formData.get('firstName')?.toString() || '',
            lastName: formData.get('lastName')?.toString() || '',
            emailAddress: formData.get('emailAddress')?.toString() || '',
            phoneNumber: formData.get('phoneNumber')?.toString() || '',
            website: formData.get('firstName')?.toString() || '',
            github: formData.get('firstName')?.toString() || '',
            linkedIn: formData.get('firstName')?.toString() || '',
        }
        
        // @todo write code to save to database
    }

    async function getContactInfo() {
        // @todo rewrite this to pull from database
        return new Promise<ContactInfo>((resolve) => {
            setTimeout(() => {
                resolve({
                    firstName: 'Rusty',
                    lastName: 'Tanton',
                    emailAddress: 'rusty.tanton@gmail.com',
                    phoneNumber: '678 523-3606',
                    website: 'https://rustytanton.com',
                    github: 'https://github.com/rustytanton/',
                    linkedIn: 'https://www.linkedin.com/in/rustytanton/'
                })
            }, 1)
        })
    }

    const ci: ContactInfo = await getContactInfo()
    
    return (
        <form action={postContactInfo}>
            <label>
                First Name: <input type="text" name="firstName" defaultValue={ci.firstName} />
            </label>
            <label>
                Last Name: <input type="text" name="lastName" defaultValue={ci.lastName} />
            </label>
            <label>
                Email Address: <input type="email" name="emailAddress" defaultValue={ci.emailAddress} />
            </label>
            <label>
                Phone Number: <input type="text" name="phoneNumber" defaultValue={ci.phoneNumber} />
            </label>
            <label>
                Website: <input type="url" name="website" defaultValue={ci.website} />
            </label>
            <label>
                LinkedIn URL: <input type="url" name="linkedIn" defaultValue={ci.linkedIn} />
            </label>
            <label>
                Github URL: <input type="url" name="github" defaultValue={ci.github} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}
