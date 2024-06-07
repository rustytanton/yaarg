export default function FormInputCheckbox({ defaultValue = '', inputName = '', label = '' }) {
    return (
        <label className="w-full flex p-2">
            <input type="checkbox" name={inputName} defaultValue={defaultValue || ''} />
            <span>{label}</span> 
        </label>
    )
}