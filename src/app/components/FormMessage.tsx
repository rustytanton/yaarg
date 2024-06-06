export default function FormMessage({ message = '' }) {
    return (
        <>
            {message ? <div className="bg-green-300 text-black p-2">{message}</div> : '' }
        </>
    )
}
