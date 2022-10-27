import { Layout, Typography } from 'antd'

import { Form } from '../Form'
import { ParseCommand } from '../ParseCommand'
import styles from './App.module.scss'

const { Header, Footer, Content } = Layout
const { Title, Text, Link } = Typography

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
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Link href="https://ssv.netvork" target="_blank">
          https://ssv.netvork
        </Link>
      </Footer>
    </Layout>
  )
}
