import { KeyShares, SSVKeys } from 'ssv-keys'
import bls from '../bls'

export const generateKeyShares = async (
  privateKey: string,
  operatorIds: Array<number>,
  operatorKeys: Array<string>,
  ssvAmount: string
) => {
  const ssvKeys = new SSVKeys(SSVKeys.VERSION.V3)

  await bls.init(bls.BLS12_381);
  ssvKeys.privateKey = `0x${bls.deserializeHexStrToSecretKey(privateKey).serializeToHexStr()}`
  ssvKeys.publicKey = `0x${bls.deserializeHexStrToSecretKey(privateKey).getPublicKey().serializeToHexStr()}`

  const encryptedShares = await ssvKeys.buildShares(privateKey, operatorIds, operatorKeys)

  const payload = await ssvKeys.buildPayload(
    {
      publicKey: ssvKeys.publicKey,
      operatorIds,
      encryptedShares,
    }
  )

  const keyShares = ssvKeys.keyShares.fromJson({
    version: 'v3',
    data: {
      operators: operatorKeys.map((operator, index) => ({
        id: operatorIds[index],
        publicKey: operator,
      })),
      publicKey: ssvKeys.publicKey,
      encryptedShares,
    },
    payload,
  })

  return keyShares.toJson()
}
