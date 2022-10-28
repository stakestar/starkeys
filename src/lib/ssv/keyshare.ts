import { KeyShares, SSVKeys } from 'ssv-keys'

export const generateKeyShares = async (
  privateKey: string,
  operatorIds: Array<number>,
  operatorKeys: Array<string>,
  ssvAmount: string
) => {
  const ssvKeys = new SSVKeys()

  const shares = await ssvKeys.buildShares(privateKey, operatorIds, operatorKeys)

  const keyShares = await KeyShares.fromData({ version: 'v2' })
  await keyShares.setData({
    operators: operatorKeys.map((operator: string, index: number) => ({
      id: operatorIds[index],
      publicKey: operator
    })),
    publicKey: ssvKeys.getValidatorPublicKey(),
    shares
  })

  const payload = await ssvKeys.buildPayload(
    ssvKeys.getValidatorPublicKey(),
    operatorIds,
    shares,
    ssvAmount
  )
  await keyShares.setPayload(payload)

  return keyShares.toString()
}
