'use client'

type Props = {
    children: any
}

export default function ListUnorderedItem(props: Props) {
    return (
        <li className="mb-2">
            {props.children}
        </li>
    )
}