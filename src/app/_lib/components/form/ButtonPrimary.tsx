type Props = {
    children?: any
    href?: string
    target?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    onClick?: any
}


export default function ButtonPrimary({
    target = '_blank',
    type = 'button',
    children,
    href,
    onClick
}: Props) {

    const buttonStyleClasses = 'rounded bg-orange-500 hover:bg-orange-400 text-white font-bold pt-2 pb-2 pl-4 pr-4'

    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={buttonStyleClasses}
                onClick={onClick}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={buttonStyleClasses}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        )
    }
}