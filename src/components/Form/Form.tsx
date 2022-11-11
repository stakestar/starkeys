import { DownloadOutlined } from '@ant-design/icons'
import { Button, Card, Input, InputNumber, Typography } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'
import { validateKeystorePassword } from '../../lib'

import { useAppState } from '../../hooks'
import styles from './Form.module.scss'
import { KeystoreFile } from './KeystoreFile'
import { Operators } from './Operators'
import { readFileContent, saveFilePicker } from '../../lib/utils'
import { generateKeyShares } from '../../lib/ssv/keyshare'
import { uint256Validator } from '../../lib/validators'

const { Title } = Typography

export function Form() {
  const {
    actions: {
      setKeystorePassword,
      setSsvAmount,
      setKeystoreFileError,
      setKeystorePasswordError,
      setOperatorsError,
      setSsvAmountError
    },
    values: { keystoreFile, keystorePassword, operators, ssvAmount },
    errors
  } = useAppState()

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)

    let isValid = true

    setIsError(false)

    if (!keystoreFile) {
      setKeystoreFileError(true)
      isValid = false
    }

    if (!keystorePassword) {
      setKeystorePasswordError(true)
      isValid = false
    }

    if (operators.some(({ id, publicKey }) => !id || !publicKey)) {
      setOperatorsError(operators.map(({ id, publicKey }) => ({ id: !id, publicKey: !publicKey })))
      isValid = false
    }

    const ssvAmountError = uint256Validator(ssvAmount)
    if (ssvAmountError) {
      setSsvAmountError(ssvAmountError.message)
      isValid = false
    }

    if (isValid) {
      const keyshare = await generateFile()
      // generate name
      await saveFilePicker('keyshare.json', keyshare)
    } else {
      setIsError(true)
    }


    setIsLoading(false)
  }

  const generateFile = async (): Promise<string> => {
    const fileContent = await readFileContent(keystoreFile)
    const privateKey = await validateKeystorePassword(fileContent, keystorePassword)

    // Did not able to get private key from keystore
    if (privateKey === false) {
      return
    }

    const operatorsIds: Array<number> = []
    const operatorsKeys: Array<string> = []
    operators.forEach(({id, publicKey}) => {
      operatorsIds.push(Number(id))
      operatorsKeys.push(publicKey)
    })

    return await generateKeyShares(
      String(privateKey),
      operatorsIds,
      operatorsKeys,
      ssvAmount
    )
  }

  return (
    <div className={styles.Form}>
      <Card className={styles.Card} bodyStyle={{ padding: 0 }}>
        <div className={styles.Row}>
          <Title level={4}>Keystore file</Title>
          <KeystoreFile />
        </div>
        <div className={styles.Row}>
          <Title level={4}>Keystore password</Title>
          <Input.Password
            placeholder="Input password"
            value={keystorePassword}
            onChange={({ target }) => setKeystorePassword(target.value)}
            status={!keystorePassword && errors.keystorePassword ? 'error' : null}
          />
        </div>
        <div className={styles.Row}>
          <Title level={4}>Operators</Title>
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
      </Card>
      <Button
        className={styles.Submit}
        onClick={onSubmit}
        icon={<DownloadOutlined />}
        size="large"
        type="primary"
        shape="round"
        loading={isLoading}
      >
        Generate KeyShare file
      </Button>
    </div>
  )
}
