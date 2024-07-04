'use client'

type Props = {
    children: any
}

export default function Heading3(props: Props) {
    return (
        <h3 className="text-lg mb-2 font-bold">{props.children}</h3>
    )
}