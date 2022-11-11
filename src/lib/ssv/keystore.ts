import { EthereumKeyStore } from 'ssv-keys'

export const validateKeystorePassword = async (
  keyStoreData: string,
  password: string
): Promise<string|null> => {
  const keyStore = new EthereumKeyStore(keyStoreData)

  return keyStore
    .getPrivateKey(password)
    .then((privateKey) => {
      return privateKey
    })
    .catch(() => null)
}
