type Props = {
    children: any
}

export default function BodyParagraphSmall({ children }: Props) {
    return (
        <p className="mb-5 text-sm">{children}</p>
    )
}