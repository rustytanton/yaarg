import RequiredCharacter from "./form/RequiredCharacter"

type Props = {
    defaultValue?: string
    inputName?: string
    inputType?: string
    label: string
    isDisabled?: boolean
    pattern?: string | undefined
    placeholder?: string | undefined
    value?: string
    required?: boolean
}

export default function FormInputText({
    defaultValue = '',
    inputName = '',
    inputType = 'text',
    label = '',
    isDisabled = false,
    pattern = undefined,
    placeholder = '',
    value = undefined,
    required = false }: Props) {
    return (
        <label className="pt-2 pb-2 flex">
            <span className="w-48">
                {label}
                {required ? <RequiredCharacter /> : ''}
            </span>            
            <input 
                className="block text-black flex-1 rounded p-1"
                type={inputType}
                name={inputName}
                defaultValue={defaultValue || ''}
                value={value}
                disabled={isDisabled}
                pattern={pattern}
                placeholder={placeholder}
                required={required}
            />
        </label>
    )
}