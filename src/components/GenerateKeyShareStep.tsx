import { DownloadOutlined, CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'

import { useAppState } from '../hooks'
import { generateKeyShares } from '../lib'
import { saveFilePicker } from '../lib/utils'
import styles from './GenerateKeyShareStep.module.scss'

export function GenerateKeyShareStep() {
  const {
    values: { operators, ownerAddress, ownerNonce, privateKey }
  } = useAppState()
  const [isCreated, setIsCreated] = useState(false)

  const onDownload = async () => {
    setIsCreated(false)

    const keyshare = await generateKeyShares(
      String(privateKey),
      operators,
      ownerAddress,
      ownerNonce
    )

    await saveFilePicker(`keyshare-${Math.round(Date.now() / 1000)}.json`, keyshare)
    setIsCreated(true)
  }

  return (
    <div className={styles.GenerateKeyShareStep}>
      <Button
        className={styles.Button}
        onClick={onDownload}
        icon={<DownloadOutlined />}
        size="large"
        type="primary"
        shape="round"
      >
        Generate KeyShare file
      </Button>
      { isCreated &&
        <div className={styles.Success}>
          <CheckOutlined style={{ color: '#52c41a', marginRight: '5px' }}/> Keyshares file successfully created
        </div>
      }
    </div>
  )
}
