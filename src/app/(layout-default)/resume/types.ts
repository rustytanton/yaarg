export enum ResumeFormNewStatuses {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS'
}

export type ResumeFormNewState = {
    message?: string
    prompt: string
    status?: ResumeFormNewStatuses,
    statusUpdated?: Date
}