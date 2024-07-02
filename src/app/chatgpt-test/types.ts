export type ChatGptKeyword = {
    skill: string
    mentioned: number
}

export type ChatGptKeywordFormState = {
    prompt: string
    result: {
        keywords: {
            skills: Array<ChatGptKeyword>
        }
    }
}