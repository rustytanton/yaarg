// import { waitUntil } from '@vercel/functions'

import prisma from "@/app/db"

export const runtime = 'nodejs'

export async function GET() {

    // testing if this will work with a serverless function
    const resume = await prisma.resume.findFirst()

    return Response.json({
        employer: resume?.employer,
        testField: 'testing'
    })
}