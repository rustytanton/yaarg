type Props = {
    children: any
}

export default function BodyParagraph({ children }: Props) {
    return (
        <p className="mb-5">{children}</p>
    )
}