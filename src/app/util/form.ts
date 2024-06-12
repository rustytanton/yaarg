export function fieldGroups(formData: FormData, groupPrefix: string) {
    return Array.from(formData.entries())
        .filter((field) => {
            return field[0].indexOf('[' + groupPrefix) > -1
        })
        .map((field) => {
            return field[0].split(']')[0] + ']'
        })
        .filter((key, index, arr) => {
            if (index === 0) {
                return true
            } else {
                return key !== arr[index-1]
            }
        })
}

export function deleteIds(formData: FormData) {
    return Array.from(formData.entries())
        .filter((field) => {
            return field[0] === '[delete]'
        })
        .map((field) => {
            return Number(field[1])
        })
}