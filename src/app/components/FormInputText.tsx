export default function FormInputText({ defaultValue = '', inputName = '', inputType = 'text', label = '' }) {
    return (
        <label className="w-full flex p-2">
            <span className="w-48">{label}</span> <input className="block text-black w-1/2" type={inputType} name={inputName} defaultValue={defaultValue || ''} />
        </label>
    )
}