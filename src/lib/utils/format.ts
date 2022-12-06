import BigNumber from "bignumber.js"

export const SSV_TOKEN_DECIMALS = 18

export const toDecimal = (val: BigNumber | number | string, decimals: number): BigNumber => {
    const multiplier = Math.pow(10, Number(decimals || 0))
    return new BigNumber(String(val)).div(multiplier)
  }
  
export const fromDecimal = (val: BigNumber | number | string, decimals: number): BigNumber => {
    if (val === '') {
        val = 0
    }

    const multiplier = Math.pow(10, Number(decimals || 0))
    return new BigNumber(String(val)).times(multiplier)
}