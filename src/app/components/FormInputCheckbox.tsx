export default function FormInputCheckbox({ defaultValue = false, inputName = '', label = '' }) {
    return (
        <label className="w-full flex p-2">
            <input type="checkbox" name={inputName} defaultChecked={defaultValue}  />
            <span>{label}</span> 
        </label>
    )
}