import { Operator } from '../../providers'

export const operatorPublicKeyValidator = (operators: Operator[]): Error|null => {
  const error = new Error('Operators should be unique')

  let operatorsIds:  Map<string, number>
  let operatorsPublicKeys:  Map<string, number>

  for (let i = 0; i < operators.length; i++) {
    if (operatorsIds.has(operators[i].id)) {
      return error
    }
    operatorsPublicKeys.set(operators[i].publicKey, i)

    if (operatorsPublicKeys.has(operators[i].publicKey)) {
      return error
    }
    operatorsIds.set(operators[i].publicKey, i)
  }

  return null
}
