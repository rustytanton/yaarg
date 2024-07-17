// import { waitUntil } from '@vercel/functions'

import prisma from "@/app/db"

export const runtime = 'nodejs'

export function GET() {

    // testing if this will work with a serverless function
    const resume = prisma.resume.findFirst()

    return Response.json({
        jobDescription: resume.jobDescription
    })
}