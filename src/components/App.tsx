import { Alert, Button, Layout, Space, Steps, Typography } from 'antd'

import styles from './App.module.scss'
import { Form } from './Form'
import { ParseCommand } from './ParseCommand'

const { Header, Footer, Content } = Layout
const { Title, Text, Link } = Typography
const { Step } = Steps

export function App() {
  return (
    <Layout className={styles.App}>
      <Header className={styles.Header}>
        <Title className={styles.Title}>SSV Key Distributor</Title>
        <Text className={styles.Description} type="secondary">
          Generate KeyShare file from your Keystore file
        </Text>
        <ParseCommand />
      </Header>
      <Content className={styles.Content}>
        <Form />
        {/*
        <Card>
          <Steps current={2}>
            <Step title="Keystore file" description="Select Keystone file from your computer" />
            <Step title="Keystore password" description="Unlock Keystone file with your password" />
            <Step title="Operators" description="Select 4 operators" />
            <Step title="SSV to deposit" description="Input SSV amount" />
            <Step
              title="Generate KeyShare file"
              description="Save KeyShare file on your computer"
            />
          </Steps>
        </Card>
        */}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Link href="https://ssv.netvork" target="_blank">
          https://ssv.netvork
        </Link>
      </Footer>
    </Layout>
  )
}
