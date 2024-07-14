type Props = {
    children: any
}

export default function ResumeHeading3({ children }: Props) {
    return (
        <h3 className="text-xl">{children}</h3>
    )
}