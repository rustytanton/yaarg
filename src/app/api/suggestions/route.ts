import { NextResponse } from 'next/server'
 
export type APIResponseSuggestions = {
  suggestions: string[]
}

export async function GET(request: Request): Promise<NextResponse<APIResponseSuggestions>> {
  return NextResponse.json({
    suggestions: [
        "suggestion 1",
        "suggestion 2",
        "suggestion 3"
    ]
  })
}
