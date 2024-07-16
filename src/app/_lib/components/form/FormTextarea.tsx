import RequiredCharacter from "@/app/_lib/components/form/RequiredCharacter"

type Props = {
    defaultValue?: string
    inputName: string
    label: string
    required?: boolean
}

export default function FormTextarea(props: Props) {
    return (
        <label>
            <span className="pb-2 block">
                {props.label}
                {props.required ? <RequiredCharacter /> : ''}
            </span>
            <textarea name={props.inputName} className="p-5 text-black w-full h-40 rounded" required={props.required}>{props.defaultValue}</textarea>
        </label>
    )
}