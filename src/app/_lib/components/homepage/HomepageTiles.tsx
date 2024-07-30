type Props = {
    children: any
}

export default function HomepageTiles({ children }: Props) {
    return (
        <div className="flex justify-center p-10">
            <div className="w-1/2">
                <div className="flex flex-wrap gap-5 justify-center">{children}</div>
            </div>
        </div>
    )
}