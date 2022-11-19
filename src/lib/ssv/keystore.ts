import { EthereumKeyStore } from 'ssv-keys'

export const validateKeystorePassword = async (
  keyStoreData: string,
  password: string
): Promise<string | null> => {
  const keyStore = new EthereumKeyStore(keyStoreData)

  return keyStore.getPrivateKey(password).catch((err) => { return null })
}
