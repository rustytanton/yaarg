'use client'

type Props = {
    children: any
}

export default function Heading2(props: Props) {
    return (
        <h2 className="text-3xl mb-5 font-bold">{props.children}</h2>
    )
}