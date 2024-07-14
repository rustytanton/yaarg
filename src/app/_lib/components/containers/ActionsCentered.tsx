type Props = {
    children: any
}

export default function ActionsCentered({ children }: Props) {
    return (
        <div className="mt-10 mb-10 flex justify-center w-full gap-2">
            {children}
        </div>
    )
}