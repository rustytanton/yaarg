import { ChatGptAssistantDTO, createChatGptAssistant, getChatGptAssistant } from "@/app/_data/chatgpt-assistant";
import { auth } from "@/app/auth";
import OpenAI from 'openai'

export type assistantProperties = {
    name: string
    instructions: string
    model: string
}

export async function assistant(props: assistantProperties): Promise<ChatGptAssistantDTO | null> {
    const session = await auth()
    const openai = new OpenAI()

    if (session && session.user) {
        const existingAssitant = await getChatGptAssistant(session.user?.id as string, props.name)
        if (existingAssitant) {
            return existingAssitant
        } else {
            const assistantRemote = await openai.beta.assistants.create({
                name: props.name,
                instructions: props.instructions,
                model: props.model,
            })
            const assistantLocal = await createChatGptAssistant({
                userId: session.user.id as string,
                name: props.name,
                instructions: props.instructions,
                model: props.model,
                externalId: assistantRemote.id
            })
            return assistantLocal
        }
    } else {
        return null
    }
}

export async function assistantMessage(assistantId: string, prompt: string) {
    const session = await auth()
    const openai = new OpenAI()

    if (session && session.user) {
        const thread = await openai.beta.threads.create()

        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: prompt
        })

        let run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        })

        while (!run.completed_at) {
            run = await openai.beta.threads.runs.retrieve(thread.id, run.id)
        }

        const messages = await openai.beta.threads.messages.list(thread.id)

        return messages
    }
}