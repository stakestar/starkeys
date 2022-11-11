import { useAppState } from '../../hooks'
import { Button, Input, InputNumber, Typography } from 'antd'
const { Title } = Typography

import styles from './OperatorsStep.module.scss'
import { useCallback, useState } from 'react'
import { parseCommandArgs } from '../../lib/utils'
import { operatorPublicKeyValidator, uint256Validator } from '../../lib'
import classNames from 'classnames'
import { Operators } from '../Form/Operators'
import Link from 'antd/lib/typography/Link'

export function OperatorsStep() {
    const {
        actions: {
            setSsvAmount,
            setOperatorsError,
            setSsvAmountError,
            setCurrentStep,
            setOperators
        },
        values: { operators, ssvAmount },
        errors
    } = useAppState()

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const parseCliArgs = useCallback(
        (args: string) => {
            const { operatorsIds, operatorsKeys, ssvTokenAmount } = parseCommandArgs(args)

            if (operatorsIds.length) {
                setOperators((currentOperators) => {
                  const operators = currentOperators.map((operator) => Object.assign({}, operator))
        
                  operatorsIds.forEach((id, index) => {
                    operators[index].id = id
                  })
        
                  return operators
                })
              }
        
              if (operatorsKeys.length) {
                setOperators((currentOperators) => {
                  const operators = currentOperators.map((operator) => Object.assign({}, operator))
        
                  operatorsKeys.forEach((publicKey, index) => {
                    operators[index].publicKey = publicKey
                  })
        
                  return operators
                })
              }
        
              if (ssvTokenAmount.length) {
                setSsvAmount(ssvTokenAmount)
              }
        }, [setOperators, setSsvAmount]
    )

    const onClickNext = async () => {
        setIsLoading(true)
        setSsvAmountError('')
        setOperatorsError([])

        let isValid = true        
        setIsError(false)

        const operatorsErrors = [...errors.operators]
        operators.forEach((operator, index) => {
            const publicKeyError = operatorPublicKeyValidator(operator.publicKey)
            if (publicKeyError !== null) {
                operatorsErrors[index].publicKey = true
                isValid = false
            } else {
                operatorsErrors[index].publicKey = false
            }

            if (!operator.id || isNaN(Number(operator.id))) {
                operatorsErrors[index].id = true
                isValid = false
            } else {
                operatorsErrors[index].id = false
            }
        })

        setOperatorsError(operatorsErrors)

        const ssvAmountError = uint256Validator(ssvAmount)

        if (ssvAmountError !== null) {
            setSsvAmountError(ssvAmountError.message)
            isValid = false
        }

        if (isValid) {
            setCurrentStep(2)
        } else {
            setIsError(true)
        }

        setIsLoading(false)
    }

    return (
        <div className={styles.OperatorsStep}>
            <div className={styles.Row}>
                <Title level={4}>Parse CLI arguments (prefered)</Title>
                <Input
                    className={styles.InputNumber}
                    placeholder="Input SSV cli arguments"
                    onChange={({ target }) => parseCliArgs(target.value)}
                />
            </div>
            <div className={styles.Row}>
                <Title level={4}>
                    or manually provide {' '}
                    <Link href="https://explorer.ssv.network/operators/" target="_blank">
                        Operators
                    </Link>
                    {' '}ids and keys
                </Title>
                <Operators />
            </div>
            <div className={styles.Row}>
                <Title level={4}>SSV to deposit</Title>
                <InputNumber
                    className={styles.InputNumber}
                    placeholder="Input SSV amount"
                    addonAfter="SSV"
                    onChange={(value) => setSsvAmount(value)}
                    value={ssvAmount}
                    status={errors.ssvAmount ? 'error' : null}
                    type="number"
                    min="0"
                />
            </div>
            <div className={classNames(styles.Error, { [styles.active]: isError })}>
                Please fill the fields above and try again
            </div>
            <Button
                className={styles.Next}
                onClick={onClickNext}
                size="large"
                type="primary"
                shape="round"
                loading={isLoading}
            >
                Next
            </Button>
        </div>
    )
}
