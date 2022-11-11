import { Layout, Typography, Steps, Card, Divider } from 'antd'
import { useState } from 'react'
import { useAppState } from '../../hooks'
import { Form } from '../Form'
import { ParseCommand } from '../ParseCommand'
import { KeystoreFileStep } from '../Steps/KeystoreFileStep'
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
        <ParseCommand />
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
                title: 'Add SSV data',
                description: '',
                subTitle: '',
              },
              {
                title: 'Get keyshare',
                description: '',
              },
            ]}
          />
          <Divider/>
          {currentStep == 0 && <KeystoreFileStep/>}
        </Card>
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
