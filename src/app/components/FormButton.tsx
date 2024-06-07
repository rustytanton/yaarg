export default function FormButton ({ buttonText = 'Button', isSubmit = false, onClick = null }) {
    return (
        <button className="m-2 p-1 bg-gray-200 text-black block" type={isSubmit ? 'submit' : 'button'} onClick={onClick}>{buttonText}</button>
    )
}