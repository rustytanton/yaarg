import RequiredCharacter from "@/app/_lib/components/form/RequiredCharacter"

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
        <label className="pt-2 pb-2 md:flex">
            <span className="w-48">
                {label}
                {required ? <RequiredCharacter /> : ''}
            </span>
            {isDisabled
                ?
                    <>
                        <input 
                            className="block text-black flex-1 rounded p-1 mb-5 md:mb-2 w-full"
                            type={inputType}
                            defaultValue={defaultValue || ''}
                            value={value}
                            disabled={isDisabled}
                            pattern={pattern}
                        />
                        <input 
                            type='hidden'
                            name={inputName}
                            defaultValue={defaultValue || ''}
                            value={value}
                        />
                    </>
                :
                    <input 
                        className="block text-black flex-1 rounded p-1 mb-5 md:mb-2 w-full"
                        type={inputType}
                        name={inputName}
                        defaultValue={defaultValue || ''}
                        value={value}
                        disabled={isDisabled}
                        pattern={pattern}
                        placeholder={placeholder}
                        required={required}
                    />
            }        
        </label>
    )
}