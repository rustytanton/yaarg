type Props = {
    children: any
}

export default function BodyPre({ children }: Props) {
    return (
        <pre className="bg-slate-800 p-10 whitespace-pre-wrap">{children}</pre>
    )
}