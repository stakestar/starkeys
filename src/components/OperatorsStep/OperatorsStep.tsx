import { Button, Input, InputNumber, Tooltip, Typography } from 'antd'
import {
  InfoCircleTwoTone,
  ArrowDownOutlined
} from '@ant-design/icons';
import Link from 'antd/lib/typography/Link'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { useAppState } from '../../hooks'
import { operatorPublicKeyValidator, operatorsUniqueValidator, isValidAddress } from '../../lib'
import { parseCommandArgs } from '../../lib/utils'
import { Operators } from './Operators'
import styles from './OperatorsStep.module.scss'

const { Title } = Typography

const ERROR_EMPTY_FIELD = 'Please fill the fields above and try again'
const ERROR_INVALID_INPUT = 'Invalid input'
const ERROR_UNIQUE_OPERATORS = 'Operators should be unique'

export function OperatorsStep() {
  const {
    actions: { setOwnerAddress, setOwnerNonce, setOperatorsError, setOwnerNonceError, setOwnerAddressError, setCurrentStep, setOperators },
    values: { operators, ownerAddress, ownerNonce },
    errors
  } = useAppState()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const parseCliArgs = useCallback(
    (args: string) => {
      const { operatorsIds, operatorsKeys, ownerAddress, ownerNonce } = parseCommandArgs(args)

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

      if (ownerAddress.length) {
        setOwnerAddress(ownerAddress)
      }

      if (ownerNonce) {
        setOwnerNonce(ownerNonce)
      }
    },
    [setOperators, setOwnerNonce, setOwnerAddress]
  )

  const onClickNext = async () => {
    setIsLoading(true)
    setOwnerNonceError('')
    setOwnerAddressError('')
    setOperatorsError([])

    let isValid = true
    setIsError(false)

    const operatorsErrors = [...errors.operators]
    operators.forEach((operator, index) => {
      const publicKeyError = operatorPublicKeyValidator(operator.publicKey)

      if (!operator.publicKey) {
        operatorsErrors[index].publicKey = true
        setErrorMsg(ERROR_EMPTY_FIELD)
        isValid = false
      } else if (publicKeyError !== null) {
        operatorsErrors[index].publicKey = true
        setErrorMsg(ERROR_INVALID_INPUT)
        isValid = false
      } else {
        operatorsErrors[index].publicKey = false
      }

      if (!operator.id) {
        operatorsErrors[index].id = true
        setErrorMsg(ERROR_EMPTY_FIELD)
        isValid = false
      } else if (isNaN(Number(operator.id))) {
        operatorsErrors[index].id = true
        setErrorMsg(ERROR_INVALID_INPUT)
        isValid = false
      } else {
        operatorsErrors[index].id = false
      }
    })

    const notUniqueOperators = operatorsUniqueValidator(operators)
    if (isValid && notUniqueOperators !== null) {
      const { notUniqueOperatorsIds, notUniqueOperatorsPubkeys } = notUniqueOperators
      if (notUniqueOperatorsIds.length) {
        notUniqueOperatorsIds.forEach((index) => {
          operatorsErrors[index].id = true
          setErrorMsg(ERROR_UNIQUE_OPERATORS)
          isValid = false
        })
      }

      if (notUniqueOperatorsPubkeys.length) {
        notUniqueOperatorsPubkeys.forEach((index) => {
          operatorsErrors[index].publicKey = true
          setErrorMsg(ERROR_UNIQUE_OPERATORS)
          isValid = false
        })
      }
    }

    setOperatorsError(operatorsErrors)

    if (!isValidAddress(ownerAddress)) {
      setOwnerAddressError('Invalid address')
    }

    if (isNaN(ownerNonce)) {
      setOwnerNonceError('Invalid nonce')
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
      <div className={styles.Row} style={{ marginBottom: '0.7rem'}}>
        <Title level={4}>Input arguments
        <Tooltip placement="right" title={<>Arguments could be generated through the <Link href="https://app.ssv.network" target="_blank">app.ssv.network</Link></>}>
          <InfoCircleTwoTone twoToneColor="#1890ff" style={{ marginLeft: '5px' }}/>
        </Tooltip></Title>
        <Input
          placeholder="Input arguments"
          onChange={({ target }) => parseCliArgs(target.value)}
        />
      </div>
      <div className={styles.Row} style={{ marginBottom: '1.5rem'}}>
        <div className={styles.Center} style={{ marginBottom: '0.7rem'}}>
          <ArrowDownOutlined style={{ fontSize: '24px', color: '#1890ff' }}  />
        </div>
        <Operators />
      </div>
      <div className={styles.Row}>
        <Title level={4}>Owner Address</Title>
        <Input
          placeholder="Input Owner Address"
          onChange={({ target }) => setOwnerAddress(target.value)}
          value={ownerAddress}
          status={errors.ownerAddress ? 'error' : null}
        />
      </div>
      <div className={styles.Row}>
        <Title level={4}>Owner Nonce</Title>
        <InputNumber
          className={styles.InputNumber}
          placeholder="Input Owner Nonce"
          onChange={(value) => setOwnerNonce(value)}
          value={ownerNonce}
          status={errors.ownerNonce ? 'error' : null}
          type="number"
          min={0}
        />
      </div>
      <div className={classNames(styles.Error, { [styles.active]: isError })}>
        {errorMsg || 'Please fill the fields above and try again'}
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
