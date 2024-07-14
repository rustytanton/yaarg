type Props = {
    defaultValue?: string
    inputName: string
    label: string
}

export default function FormTextarea(props: Props) {
    return (
        <label>
            <span className="pb-2 block">{props.label}</span>
            <textarea name={props.inputName} className="p-5 text-black w-full h-40 rounded">{props.defaultValue}</textarea>
        </label>
    )
}