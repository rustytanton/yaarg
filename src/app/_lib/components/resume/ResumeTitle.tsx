type Props = {
    children: any
}

export default function ResumeTitle({ children }: Props) {
    return (
        <h1 className="text-4xl mb-2">{children}</h1>
    )
}