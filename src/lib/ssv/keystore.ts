import { EthereumKeyStore } from 'ssv-keys'

export const validateKeystorePassword = async (
  keyStoreData: string,
  password: string
): Promise<string|boolean> => {
  const keyStore = new EthereumKeyStore(keyStoreData)

  return keyStore
    .getPrivateKey(password)
    .then((privateKey) => {
      return privateKey
    })
    .catch(() => false)
}
