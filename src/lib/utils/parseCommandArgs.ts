type ParsedCommandArgs = {
  operatorsKeys: string[]
  operatorsIds: string[]
  ownerAddress: string,
  ownerNonce: number
}

const argumentsNames = {
  operatorsKeys: '--operators-keys=',
  operatorsKeysShort: '-oks=',
  operatorsIds: '--operators-ids=',
  operatorsIdsShort: '-oids=',
  ownerAddress: '--owner-address=',
  ownerAddressShort: '-oa=',
  ownerNonce: '--owner-nonce',
  ownerNonceShort: '-on=',
}

export function parseCommandArgs(cliArgs: string): ParsedCommandArgs {
  const args = cliArgs.split(' ')
  const {
    operatorsKeys,
    operatorsKeysShort,
    operatorsIds,
    operatorsIdsShort,
    ownerAddress,
    ownerAddressShort,
    ownerNonce,
    ownerNonceShort
  } = argumentsNames

  const parsedCommandArgs: ParsedCommandArgs = {
    operatorsKeys: [],
    operatorsIds: [],
    ownerAddress: '',
    ownerNonce: null
  }

  args.forEach((item) => {
    const arg = item.trim()

    if (arg.includes(operatorsKeys)) {
      parsedCommandArgs.operatorsKeys = arg
        .substring(operatorsKeys.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.includes(operatorsKeysShort)) {
      parsedCommandArgs.operatorsKeys = arg
        .substring(operatorsKeysShort.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.includes(operatorsIds)) {
      parsedCommandArgs.operatorsIds = arg
        .substring(operatorsIds.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.includes(operatorsIdsShort)) {
      parsedCommandArgs.operatorsIds = arg
        .substring(operatorsIdsShort.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.includes(ownerAddress)) {
      parsedCommandArgs.ownerAddress = arg.substring(ownerAddress.length)
    }

    if (arg.includes(ownerAddressShort)) {
      parsedCommandArgs.ownerAddress = arg.substring(ownerAddressShort.length)
    }

    if (arg.includes(ownerNonce)) {
      parsedCommandArgs.ownerNonce = Number(arg.substring(ownerNonce.length))
    }

    if (arg.includes(ownerNonceShort)) {
      parsedCommandArgs.ownerNonce = Number(arg.substring(ownerNonceShort.length))
    }
  })

  return parsedCommandArgs
}
