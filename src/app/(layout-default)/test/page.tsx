import { ChatGptAssistantService } from "@/app/_data/chatgpt-assistant"


export default async function TestPage() {
    const service = new ChatGptAssistantService()
    const result = await service.get(1)

    return (
        <div>{result?.name}</div>
    )
}