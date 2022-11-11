import { useAppState } from '../../hooks'
import { Button, Input, Typography } from 'antd'
import { KeystoreFile } from '../Form/KeystoreFile'
const { Title } = Typography

import styles from './KeystoreFileStep.module.scss'
import { useState } from 'react'
import { readFileContent } from '../../lib/utils'
import { validateKeystorePassword } from '../../lib'
import classNames from 'classnames'

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

    const onClickNext = async () => {
        setKeystoreFileError(false)
        setKeystorePasswordError(false)

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

        if (isValid) {
            const fileContent = await readFileContent(keystoreFile)
            const privateKey = await validateKeystorePassword(fileContent, keystorePassword)

            if (!privateKey) {
                setIsError(true)
            } else {
                setPrivateKey(privateKey)
                setCurrentStep(1)
            }
        } else {
            setIsError(true)
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
