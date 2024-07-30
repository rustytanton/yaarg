type Props = {
    children: any
}

export default function HomepageTiles({ children }: Props) {
    return (
        <div className="flex justify-center p-10">
            <div className="lg:w-3/5">
                <div className="flex flex-col md:flex-row md:flex-wrap gap-5 justify-center">{children}</div>
            </div>
        </div>
    )
}