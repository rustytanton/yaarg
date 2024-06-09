export function validDateOrNull(dateString: string): Date | null {
    let d = new Date(dateString)
    if (isNaN(d.getDate())) {
        return null
    } else {
        return d
    }
}