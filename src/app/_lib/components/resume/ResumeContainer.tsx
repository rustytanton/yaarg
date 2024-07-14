type Props = {
    children: any
}

export default function ResumeContainer({ children }: Props) {
    return (
        <div className="bg-white text-black p-10 mb-5 w-full">{children}</div>
    )
}