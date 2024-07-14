type Props = {
    children: any
}

export default function ResumeSubheading({ children }: Props) {
    return (
        <h2 className="text-2xl mb-5">{children}</h2>
    )
}