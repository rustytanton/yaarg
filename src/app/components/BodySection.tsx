'use client'

type Props = {
    children: any
}

export default function BodySection(props: Props) {
    return (
        <section className="mb-10">
            {props.children}
        </section>
    )
}