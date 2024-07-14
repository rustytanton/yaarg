type Props = {
    summary?: string
}

export default function ResumePrintSummary({ summary }: Props) {
    return (
        <div className="mb-5">
            {summary}
        </div>
    )
}