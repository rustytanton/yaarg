'use client'

type Props = {
    children: any
}

export default function ListUnordered(props: Props) {
    return (
        <ul className="list-disc pl-5">
            {props.children}
        </ul>
    )
}