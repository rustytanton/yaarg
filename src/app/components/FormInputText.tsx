type Props = {
    defaultValue?: string
    inputName?: string
    inputType?: string
    label: string
    isDisabled?: boolean
    pattern?: string | undefined
    placeholder?: string | undefined
}

export default function FormInputText({
    defaultValue = '',
    inputName = '',
    inputType = 'text',
    label = '',
    isDisabled = false,
    pattern = undefined,
    placeholder = '' }: Props) {
    return (
        <label className="p-2 flex">
            <span className="w-48">{label}</span> 
            <input className="block text-black flex-1" type={inputType} name={inputName} defaultValue={defaultValue || ''} disabled={isDisabled} pattern={pattern} placeholder={placeholder} />
        </label>
    )
}