import { decode } from 'js-base64'
import { JSEncrypt } from 'jsencrypt'

export const operatorPublicKeyValidator = (publicKey: string): boolean => {
    try {
        const decodedOperator = decode(publicKey)
        if (!decodedOperator.startsWith('-----BEGIN RSA PUBLIC KEY-----')) {
            return false
        }

        const encrypt = new JSEncrypt({})
        try {
            encrypt.setPublicKey(decodedOperator)
        } catch (error) {
            return false
        }

        return true;
    } catch (e) {
        return false
    }
}