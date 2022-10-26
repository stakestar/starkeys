import EthereumKeyStore from 'eth2-keystore-js'

export const validateKeystorePassword = async (keyStoreData: string, password: string): Promise<boolean> => {
    const keyStore = new EthereumKeyStore(keyStoreData);
    return keyStore.getPrivateKey(password)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false
        })
}