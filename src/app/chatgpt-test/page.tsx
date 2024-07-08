'use server';

import FormKeywords from "./form-keywords";
import { auth } from '@/app/auth'
import NoAccessMessage from '@/app/_lib/components/NoAccessMessage';

export default async function TestPage() {
    const session = await auth()
    if (session) {
        return (
            <>
                <h1>ChatGPT Test Page</h1>
                <FormKeywords />
            </>
        )
    } else {
        return (
            <NoAccessMessage />
        )
    }
}
