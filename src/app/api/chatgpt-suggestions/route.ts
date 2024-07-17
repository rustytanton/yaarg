// import { waitUntil } from '@vercel/functions'

export const runtime = 'nodejs'

export function GET() {
    return new Response(`I am a Serverless Function`, {
        status: 200,
    })
}