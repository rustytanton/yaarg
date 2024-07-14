type Props = {
    children: any
}

export default function ResumeButtons({ children }: Props) {
    return (
        <div className="flex justify-center items-center mb-5 gap-2">{children}</div>
    )
}