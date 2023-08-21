export const isValidAddress = (address: string): boolean => {
    if (typeof address !== 'string') {
        return false
    }

    if (address.length !== 42) {
        return false
    }

    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        return false
    }

    return true
}