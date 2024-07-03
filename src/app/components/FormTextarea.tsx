type Props = {
    defaultValue?: string
    inputName: string
    label: string
}

export default function FormTextarea(props: Props) {
    return (
        <label>
            <span className="pb-2 block">{props.label}</span>
            <textarea name={props.inputName} className="p-2 text-black w-full h-40">{props.defaultValue}</textarea>
        </label>
    )
}