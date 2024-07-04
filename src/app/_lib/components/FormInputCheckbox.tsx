import { MouseEventHandler } from "react"

type Props = {
    defaultValue: boolean
    inputName?: string
    label?: string
    onClick?: MouseEventHandler<HTMLInputElement> | undefined
}

export default function FormInputCheckbox({ defaultValue = false, inputName = '', label = '', onClick = undefined }: Props) {
    return (
        <label className="w-full flex p-2">
            <input type="checkbox" name={inputName} defaultChecked={defaultValue} onClick={onClick} />
            <span className="pl-2">{label}</span> 
        </label>
    )
}