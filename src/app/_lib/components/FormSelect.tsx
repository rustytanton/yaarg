type Props = {
    label?: string
    inputName: string
    options: string[]
    defaultValue?: string
}


export default function FormSelect(props: Props) {
    return (
        <label className="w-full flex pt-2 pb-2">
            <span className="pr-2 w-48">{props.label}</span> 
            <select className="text-black rounded p-1" name={props.inputName} defaultValue={props.defaultValue}>
                {props.options.map((option, index) => {
                    return <option key={index}>{option}</option>
                })}
            </select>
        </label>
    )
}