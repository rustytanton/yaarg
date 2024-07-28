export enum ContactInfoFormStatus {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type ContactInfoFormState = {
    message?: string
    status?: ContactInfoFormStatus
    statusUpdated?: Date
    clearMessage?: boolean
}