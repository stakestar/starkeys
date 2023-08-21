import { KeyShares, SSVKeys } from 'ssv-keys'
import bls from '../bls'
import { IOperator } from 'ssv-keys/dist/tsc/src/lib/KeyShares/KeySharesData/IOperator'
import { Operator } from '../../providers'

const convertOperatorToIOperator = (operators: Array<Operator>): Array<IOperator> => {
  return operators.map((operator) => {
    return {
      id: Number(operator.id),
      operatorKey: operator.publicKey
    }
  })
}

export const generateKeyShares = async (
  privateKey: string,
  operatorsArray: Operator[],
  ownerAddress: string,
  ownerNonce: number
) => {
  const ssvKeys = new SSVKeys()

  await bls.init(bls.BLS12_381)
  const hexedPrivateKey = `0x${bls.deserializeHexStrToSecretKey(privateKey).serializeToHexStr()}`
  const publicKey = `0x${bls.deserializeHexStrToSecretKey(privateKey).getPublicKey().serializeToHexStr()}`

  const operators = convertOperatorToIOperator(operatorsArray)
  const encryptedShares = await ssvKeys.buildShares(hexedPrivateKey, operators)

  const keyShares = new KeyShares()
  await keyShares.update({
    ownerAddress,
    ownerNonce,
    operators,
    publicKey,
  });

  await keyShares.buildPayload({
    publicKey,
    operators,
    encryptedShares,
  }, {
    ownerAddress,
    ownerNonce,
    privateKey,
  })

  return keyShares.toJson()
}
