export default function FormSubmitButton({ buttonText = 'Submit' }) {
    return (
        <input className="m-2 p-1 bg-gray-200 text-black" type="submit" value={buttonText} />
    )
}