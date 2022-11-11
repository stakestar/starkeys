const EXPLORER_URL = 'https://explorer.ssv.network'

export const getOperatorUrl = (id: string): string => {
    return `${EXPLORER_URL}/operators/${id}`
}