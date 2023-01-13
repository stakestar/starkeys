import { Steps as AntdSteps } from 'antd'

import { useAppState } from '../hooks'
import styles from './Steps.module.scss'

export function Steps(): JSX.Element {
  const {
    values: { currentStep }
  } = useAppState()

  return (
    <AntdSteps
      type="navigation"
      size="small"
      className={styles.Steps}
      current={currentStep}
      items={[
        {
          title: 'Upload Keystore',
          description: ''
        },
        {
          title: 'Set operators data',
          description: '',
          subTitle: ''
        },
        {
          title: 'Generate Keyshares',
          description: ''
        }
      ]}
    />
  )
}
