import { Card, Layout, Typography } from 'antd'

import { useAppState } from '../hooks'
import styles from './App.module.scss'
import { GenerateKeyShareStep } from './GenerateKeyShareStep'
import { KeystoreFileStep } from './KeystoreFileStep'
import { OperatorsStep } from './OperatorsStep'
import { Steps } from './Steps'

const { Header, Footer, Content } = Layout
const { Title, Text, Link } = Typography

export function App() {
  const {
    values: { currentStep }
  } = useAppState()

  return (
    <Layout className={styles.App}>
      <Header className={styles.Header}>
        <Title className={styles.Title}>StarKeys</Title>
      </Header>
      <Content className={styles.Content}>
        <Steps />
        <Card className={styles.Card} bodyStyle={{ padding: 0 }}>
          {currentStep == 0 && <KeystoreFileStep />}
          {currentStep == 1 && <OperatorsStep />}
          {currentStep == 2 && <GenerateKeyShareStep />}
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Link href="https://ssv.network" target="_blank">
          https://ssv.network
        </Link>{' '}
        x{' '}
        <Link href="https://stakestar.io" target="_blank">
          https://stakestar.io
        </Link>
      </Footer>
    </Layout>
  )
}
