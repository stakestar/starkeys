import { useAppState } from '../../hooks'
import { Button, Card, Input, InputNumber, Typography } from 'antd'
import { KeystoreFile } from '../Form/KeystoreFile'
const { Title } = Typography

import styles from './KeystoreFileStep.module.scss'
import { useState } from 'react'

export function KeystoreFileStep() {
    const {
        actions: {
            setKeystorePassword,
            setCurrentStep
        },
        values: { keystorePassword },
        errors
    } = useAppState()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
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

            <Button
                className={styles.Submit}
                onClick={onSubmit}
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
