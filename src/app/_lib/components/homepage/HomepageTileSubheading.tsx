type Props = {
    children: any
}

export default function HomepageTileTextSubheading({ children }: Props) {
    return (
        <h4 className="text-sm">{children}</h4>
    )
}