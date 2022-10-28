import { DownloadOutlined } from '@ant-design/icons'
import { Form as AndtForm, Button, Card, Input, InputNumber, Typography } from 'antd'

import { useAppState } from '../../hooks'
import styles from './Form.module.scss'
import { KeystoreFile } from './KeystoreFile'
import { Operators } from './Operators'

const { Item } = AndtForm
const { Title } = Typography

export function Form() {
  const { actions, keystoreFile, keystorePassword, operators, ssvAmount } = useAppState()

  const onSubit = () => {
    console.log('form data', { keystoreFile, keystorePassword, operators, ssvAmount })
  }

  return (
    <div className={styles.Form}>
      <Card className={styles.Card} bodyStyle={{ padding: 0 }}>
        <Item>
          <Title level={4}>Keystore file</Title>
          <KeystoreFile />
        </Item>
        <Item
          name="password"
          rules={[{ required: true, message: 'Please input Keystore password' }]}
        >
          <Title level={4}>Keystore password</Title>
          <Input.Password
            placeholder="Input password"
            value={keystorePassword}
            onChange={({ target }) => actions.setKeystorePassword(target.value)}
          />
        </Item>
        <Item>
          <Title level={4}>Operators</Title>
          <Operators />
        </Item>
        <Item name="ssv" rules={[{ required: true, message: 'Please input your SSV amount' }]}>
          <Title level={4}>SSV to deposit</Title>
          <InputNumber
            className={styles.InputNumber}
            placeholder="Input SSV amount"
            addonAfter="SSV"
            onChange={(value) => actions.setSsvAmount(value)}
            value={ssvAmount}
            type="number"
          />
        </Item>
      </Card>
      <Button
        className={styles.Submit}
        onClick={onSubit}
        icon={<DownloadOutlined />}
        size="large"
        type="primary"
        shape="round"
        loading={false}
      >
        Generate KeyShare file
      </Button>
    </div>
  )
}
