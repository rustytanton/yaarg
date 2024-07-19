import prisma from "@/app/db"
import { assistantMessageAsyncResult, chatGptAsyncJobStatuses } from "@/app/_lib/chatgpt/assistant"


type Params = {
    jobId: string
}

export async function GET(request: Request, context: { params: Params }): Promise<Response> {
    let status: string = chatGptAsyncJobStatuses.UNKNOWN
    const jobId = Number(context.params.jobId)
    
    const job = await prisma.chatGptAsyncJob.findFirst({
        where: {
            id: jobId
        }
    })

    if (job) {
        const result = await assistantMessageAsyncResult(job)
        status = result.status
    }

    return Response.json({
        status: status
    })
}