type ParsedCommandArgs = {
  operatorsKeys: string[]
  operatorsIds: string[]
  ssvTokenAmount: string
}

const argumentsNames = {
  operatorsKeys: '--operators-keys=',
  operatorsIds: '--operators-ids=',
  ssvTokenAmount: '--ssv-token-amount='
}

export function parseCommandArgs(cliArgs: string): ParsedCommandArgs {
  const args = cliArgs.split(' ')
  const { operatorsKeys, operatorsIds, ssvTokenAmount } = argumentsNames

  const parsedCommandArgs: ParsedCommandArgs = {
    operatorsKeys: [],
    operatorsIds: [],
    ssvTokenAmount: ''
  }

  args.forEach((item) => {
    const arg = item.trim()

    if (arg.includes(operatorsKeys)) {
      parsedCommandArgs.operatorsKeys = arg
        .substring(operatorsKeys.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.includes(operatorsIds)) {
      parsedCommandArgs.operatorsIds = arg
        .substring(operatorsIds.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.includes(ssvTokenAmount)) {
      parsedCommandArgs.ssvTokenAmount = arg.substring(ssvTokenAmount.length)
    }
  })

  return parsedCommandArgs
}
