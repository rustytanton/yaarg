type Props = {
    children: any
}

export default function HomepageTileTextHeading({ children }: Props) {
    return (
        <h2 className="text-2xl">{children}</h2>
    )
}