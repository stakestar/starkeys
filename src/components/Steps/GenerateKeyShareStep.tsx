import { useAppState } from '../../hooks'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'

import styles from './GenerateKeyShareStep.module.scss'
import { saveFilePicker } from '../../lib/utils'
import { generateKeyShares } from '../../lib'

export function GenerateKeyShareStep() {
    const {
        values: { operators, ssvAmount, privateKey },
    } = useAppState()

    const onDownload = async () => {
        const operatorsIds: Array<number> = []
        const operatorsKeys: Array<string> = []

        operators.forEach(({id, publicKey}) => {
          operatorsIds.push(Number(id))
          operatorsKeys.push(publicKey)
        })
    
        const keyshare = await generateKeyShares(
          String(privateKey),
          operatorsIds,
          operatorsKeys,
          ssvAmount
        )

        console.log(keyshare)

        // generate name

        await saveFilePicker(`keyshare-${Math.round(Date.now() / 1000)}.json`, keyshare)
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
        </div>
    )
}
