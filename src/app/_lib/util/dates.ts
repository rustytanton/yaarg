export function parseMMYYYY(str: string): Date {
    const pattern = /\d{1,2}\/\d{4}/
    if (str.match(pattern)) {
        const [month, year] = str.split('/')
        return new Date(Number(year), Number(month))
    } else {
        throw new Error('str does not match regexp pattern')
    }
}
