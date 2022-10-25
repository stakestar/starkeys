type ParsedCommandArgs = {
  operatorsKeys: string[]
  operatorsIds: number[]
  ssvTokenAmount: string
}

const argumentsNames = {
  operatorsKeys: '--operators-keys=',
  operatorsIds: '--operators-ids=',
  ssvTokenAmount: '--ssv-token-amount='
}

export function parseCommandArgs(cliArgs: string): ParsedCommandArgs {
  const args = cliArgs.split(' ')

  const parsedCommandArgs: ParsedCommandArgs = {
    operatorsKeys: [],
    operatorsIds: [],
    ssvTokenAmount: ''
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i].trim()

    if (arg.length === 0) {
      continue
    }

    if (arg.indexOf(argumentsNames.operatorsKeys) == 0) {
      parsedCommandArgs.operatorsKeys = arg
        .substring(argumentsNames.operatorsKeys.length)
        .split(',')
        .map((el) => el.trim())
    }

    if (arg.indexOf(argumentsNames.operatorsIds) == 0) {
      parsedCommandArgs.operatorsIds = arg
        .substring(argumentsNames.operatorsIds.length)
        .split(',')
        .map((el) => Number(el))
    }

    if (arg.indexOf(argumentsNames.ssvTokenAmount) == 0) {
      parsedCommandArgs.ssvTokenAmount = arg.substring(argumentsNames.ssvTokenAmount.length)
    }
  }

  return parsedCommandArgs
}
