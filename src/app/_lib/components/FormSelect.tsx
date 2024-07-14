import RequiredCharacter from "./form/RequiredCharacter"

type Props = {
    label?: string
    inputName: string
    options: string[]
    defaultValue?: string
    required?: boolean
}


export default function FormSelect(props: Props) {
    return (
        <label className="w-full flex pt-2 pb-2">
            <span className="pr-2 w-48">
                {props.label}
                {props.required ? <RequiredCharacter /> : ''}
            </span> 
            <select className="text-black rounded p-1" name={props.inputName} defaultValue={props.defaultValue} required={props.required}>
                {props.options.map((option, index) => {
                    return <option key={index}>{option}</option>
                })}
            </select>
        </label>
    )
}