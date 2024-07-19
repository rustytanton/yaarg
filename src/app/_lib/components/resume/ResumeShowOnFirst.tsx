type Props = {
    resumeCount: number
    children: any
}

export function ResumeShowOnFirst({ children, resumeCount = 0 }: Props) {
    if (resumeCount < 2) {
        return children
    }
}