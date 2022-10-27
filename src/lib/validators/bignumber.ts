import BigNumber from "bignumber.js";

const maxUint256 = new BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935')

export const uint256Validator = (value: string): boolean => {
    try {
      const amount = new BigNumber(value)
      if (amount.gte(0) && amount.lte(maxUint256)) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  };