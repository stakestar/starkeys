import { Button, Input, Typography } from 'antd'
import classNames from 'classnames'
import { useState } from 'react'
import { ipcRenderer } from 'electron'
import { useAppState } from '../../hooks'
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
  const [errorMsg, setErrorMsg] = useState('')

  const onClickNext = () => {
    setKeystoreFileError(false)
    setKeystorePasswordError(false)

    setIsLoading(true)

    setErrorMsg('')
    setIsError(false)
    let isValid = true

    if (!keystoreFile) {
      setKeystoreFileError(true)
      isValid = false
    }

    if (!keystorePassword) {
      setKeystorePasswordError(true)
      isValid = false
    }

    if (isValid) {
      readFileContent(keystoreFile)
        .then((fileContent) => {
          ipcRenderer.invoke('validateKeystorePassword', fileContent, keystorePassword)
          .then((privateKeyOrError) => {
            if (privateKeyOrError instanceof Error) {
              setIsError(true)
              setErrorMsg(privateKeyOrError.message)
              setIsLoading(false)
            } else {
              setPrivateKey(privateKeyOrError)
              setCurrentStep(1)
            }
          })
          .catch((err) => {
            setIsError(true)
            setErrorMsg(err.message)
            setIsLoading(false)
          })
        })
        .catch((err) => {
          setIsError(true)
          setErrorMsg(err.message)
          setIsLoading(false)
        })
    } else {
      setIsError(true)
      setIsLoading(false)
    }
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
        {errorMsg ? errorMsg : 'Please fill the fields above and try again'}

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
