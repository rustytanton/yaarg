type Props = {
    resumeCount: number
    children: any
}

export function ResumeShowOnMoreThanOne({ children, resumeCount = 0 }: Props) {
    if (resumeCount > 1) {
        return children
    }
}