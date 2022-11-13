import { Steps as AntdSteps } from 'antd'

import { useAppState } from '../hooks'
import styles from './Steps.module.scss'

export function Steps(): JSX.Element {
  const {
    values: { currentStep }
  } = useAppState()

  return (
    <AntdSteps
      className={styles.Steps}
      current={currentStep}
      items={[
        {
          title: 'Read Keystore',
          description: ''
        },
        {
          title: 'Set operators data',
          description: '',
          subTitle: ''
        },
        {
          title: 'Generate KeyShare',
          description: ''
        }
      ]}
    />
  )
}
