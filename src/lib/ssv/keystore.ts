import { EthereumKeyStore } from 'ssv-keys'

const invalidPassError = new Error('Invalid password')
const invalidFileError = new Error('Invalid keystore file')

export const validateKeystorePassword = async (
  keyStoreData: string,
  password: string
): Promise<string | Error> => {
  let keyStore: EthereumKeyStore

  try {
    keyStore = new EthereumKeyStore(keyStoreData)
  } catch (err) {
    return invalidFileError
  }

  try {
    return keyStore.getPrivateKey(password)
  } catch (err) {
    return invalidPassError
  }
}
