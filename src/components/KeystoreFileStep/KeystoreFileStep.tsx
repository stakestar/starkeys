import { Button, Input, Typography } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'

import { useAppState } from '../../hooks'
import { validateKeystorePassword } from '../../lib'
import { readFileContent } from '../../lib/utils'
import { KeystoreFile } from './KeystoreFile'
import styles from './KeystoreFileStep.module.scss'

const { Title } = Typography

export function KeystoreFileStep() {
  const {
    actions: {
      setKeystorePassword,
      setPrivateKey,
      setKeystoreFileError,
      setKeystorePasswordError,
      setCurrentStep
    },
    values: { keystoreFile, keystorePassword },
    errors
  } = useAppState()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInvalidPass, setIsInvalidPass] = useState(false)

  const onClickNext = async () => {
    setKeystoreFileError(false)
    setKeystorePasswordError(false)

    setIsLoading(true)

    let isValid = true
    setIsError(false)
    setIsInvalidPass(false)

    if (!keystoreFile) {
      console.log('???')
      setKeystoreFileError(true)
      isValid = false
    }

    if (!keystorePassword) {
      setKeystorePasswordError(true)
      isValid = false
    }

    if (isValid) {
      const fileContent = await readFileContent(keystoreFile)
      console.log('fileContent', fileContent)
      console.log('keystorePassword', keystorePassword)
      const privateKey = await validateKeystorePassword(fileContent, keystorePassword)

      if (privateKey) {
        setPrivateKey(privateKey)
        setCurrentStep(1)
      } else {
        setIsError(true)
        setIsInvalidPass(true)
        console.error('privateKey', privateKey)
      }
    } else {
      setIsError(true)
      console.error('isValid', isValid)
    }

    setIsLoading(false)
  }

  return (
    <div className={styles.KeystoreFileStep}>
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
      <div className={classNames(styles.Error, { [styles.active]: isError })}>
        { isInvalidPass ? 'Invalid password' : 'Please fill the fields above and try again' }
        
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
