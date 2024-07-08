type Props = {
    message?: string
}

export default function NoAccessMessage({ message = 'Please log in to see this page' }: Props) {
    return (
        <div className="p-10">{message}</div>
    )
}