import { decode } from 'js-base64'
import { JSEncrypt } from 'jsencrypt'

export const operatorPublicKeyValidator = (publicKey: string): Error|null => {
  const error = new Error('Invalid public key')

  try {
    const decodedOperator = decode(publicKey)
    if (!decodedOperator.startsWith('-----BEGIN RSA PUBLIC KEY-----')) {
      return error
    }

    const encrypt = new JSEncrypt({})
    try {
      encrypt.setPublicKey(decodedOperator)
    } catch (error) {
      return error
    }

    return null
  } catch (e) {
    return error
  }
}
