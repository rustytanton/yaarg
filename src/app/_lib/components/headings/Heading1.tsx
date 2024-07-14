type Props = {
    children: any
}

export default function Heading1({ children }: Props) {
    return (
        <h1 className="text-4xl">{children}</h1>
    )
}