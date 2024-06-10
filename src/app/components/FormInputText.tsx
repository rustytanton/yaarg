export default function FormInputText({ defaultValue = '', inputName = '', inputType = 'text', label = '', isDisabled = false }) {
    return (
        <label className="p-2 flex">
            <span className="w-48">{label}</span> 
            <input className="block text-black" type={inputType} name={inputName} defaultValue={defaultValue || ''} disabled={isDisabled} />
        </label>
    )
}