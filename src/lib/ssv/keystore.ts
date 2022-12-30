import { EthereumKeyStore } from 'ssv-keys'

const invalidPassError = new Error('Invalid password')
const invalidFileError = new Error('Invalid keystore file')

export const validateKeystorePassword = async (
  keyStoreData: string,
  password: string
): Promise<string> => {
  const keyStore = new EthereumKeyStore(keyStoreData)

  return keyStore.getPrivateKey(password)
}
