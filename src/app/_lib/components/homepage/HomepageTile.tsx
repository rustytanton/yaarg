import Link from "next/link"

type Props = {
    children: any,
    href: string,
    icon: any
}

export default function HomepageTile({
    children, href, icon
}: Props) {
    return (
        <Link href={href} className="w-2/5 bg-slate-800 hover:bg-slate-500 rounded-2xl p-10 flex">
            <div className="pr-2 pt-1">
                {icon}
            </div>
            <div>
                {children}
            </div>
        </Link>
    )
}