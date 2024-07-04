'use client'

type Props = {
    children: any
}

export default function BodyHeader(props: Props) {
    return (
        <header className="mb-10">
            {props.children}
        </header>
    )
}