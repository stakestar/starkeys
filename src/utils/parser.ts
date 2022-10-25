type ParsedCliArgs = {
    operatorsKeys: string[],
    operatorsIds: number[],
    ssvTokenAmount: string
}

const argumentsNames = {
    operatorsKeys: '--operators-keys=',
    operatorsIds: '--operators-ids=',
    ssvTokenAmount: '--ssv-token-amount',
}

export const parseSsvCliArgs = (cliArgs: string): ParsedCliArgs => {
    const args = cliArgs.split(' ')

    let parsedCliArgs: ParsedCliArgs

    for (let i = 0; i < args.length; i++) {
        const arg = args[i].trim()
        if (arg.length === 0) {
            continue
        }

        if (arg.indexOf(argumentsNames.operatorsKeys) == 0) {
            parsedCliArgs.operatorsKeys = arg.substring(argumentsNames.operatorsKeys.length).split(',').map(el => el.trim())
        }

        if (arg.indexOf(argumentsNames.operatorsIds) == 0) {
            parsedCliArgs.operatorsIds = arg.substring(argumentsNames.operatorsIds.length).split(',').map(el => Number(el))
        }

        if (arg.indexOf(argumentsNames.ssvTokenAmount) == 0) {
            parsedCliArgs.ssvTokenAmount = arg.substring(argumentsNames.ssvTokenAmount.length)
        }
    }

    return parsedCliArgs
}
