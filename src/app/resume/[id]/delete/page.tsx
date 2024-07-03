'use server'

import ResumeDeleteForm from "./form"

export default async function ResumeDeletePage({ params }:{ params: { id: string } }) {
    return (
        <ResumeDeleteForm id={params.id} />
    )
}