import { Layout, Typography, Steps, Card, Divider } from 'antd'
import { useAppState } from '../../hooks'
import { GenerateKeyShareStep } from '../Steps/GenerateKeyShareStep'
import { KeystoreFileStep } from '../Steps/KeystoreFileStep'
import { OperatorsStep } from '../Steps/OperatorsStep'
import styles from './App.module.scss'

const { Header, Footer, Content } = Layout
const { Title, Text, Link } = Typography

export function App() {
  const {values: {currentStep}} = useAppState()

  return (
    <Layout className={styles.App}>
      <Header className={styles.Header}>
        <Title className={styles.Title}>SSV Key Distributor</Title>
        <Text className={styles.Description} type="secondary">
          Generate KeyShare file from your Keystore file
        </Text>
      </Header>
      <Content className={styles.Content}>
        <Card className={styles.Card} bodyStyle={{ padding: 0 }}>
          <Steps
            current={currentStep}
            items={[
              {
                title: 'Read keystore',
                description: '',
              },
              {
                title: 'Set Operators data',
                description: '',
                subTitle: '',
              },
              {
                title: 'Generate KeyShare',
                description: '',
              },
            ]}
          />
          <Divider/>
          {currentStep == 0 && <KeystoreFileStep/>}
          {currentStep == 1 && <OperatorsStep/>}
          {currentStep == 2 && <GenerateKeyShareStep/>}
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Link href="https://ssv.network" target="_blank">
          https://ssv.network
        </Link>
        {' '}x{' '}
        <Link href="https://stakestar.io" target="_blank">
          https://stakestar.io
        </Link>
      </Footer>
    </Layout>
  )
}
