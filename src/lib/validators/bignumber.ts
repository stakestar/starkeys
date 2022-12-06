import BigNumber from 'bignumber.js'
import { fromDecimal, SSV_TOKEN_DECIMALS } from '../utils'

const maxUint256 = new BigNumber(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935'
)

export const uint256Validator = (value: string): Error|null => {
  const error = new Error('Invalid amount')

  value = String(value)

  if (value.trim() === '') {
    return null
  }

  try {
    const amount = fromDecimal(value, SSV_TOKEN_DECIMALS)

    if (amount.gte(0) && amount.lte(maxUint256)) {
      return null
    }

    return error
  } catch (e) {
    return error
  }
}
