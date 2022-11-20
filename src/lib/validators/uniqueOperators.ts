import { Operator } from '../../providers'

type OperatorsUniqueValidatorReturnType = {
  notUniqueOperatorsIds: Array<number>
  notUniqueOperatorsPubkeys: Array<number>
}

export const operatorsUniqueValidator = (operators: Operator[]): OperatorsUniqueValidatorReturnType|null => {
  const notUniqueOperatorsIds = []
  const notUniqueOperatorsPubkeys = []

  const operatorsIds:  Map<string, number> = new Map()
  const operatorsPublicKeys:  Map<string, number> = new Map()

  for (let i = 0; i < operators.length; i++) {
    if (operatorsIds.has(operators[i].id)) {
      notUniqueOperatorsIds.push(i)
    }
    operatorsIds.set(operators[i].id, i)

    if (operatorsPublicKeys.has(operators[i].publicKey)) {
      notUniqueOperatorsPubkeys.push(i)
    }
    operatorsPublicKeys.set(operators[i].publicKey, i)
  }

  if (notUniqueOperatorsIds.length || notUniqueOperatorsPubkeys.length) {
    return { notUniqueOperatorsIds, notUniqueOperatorsPubkeys }
  }

  return null
}
