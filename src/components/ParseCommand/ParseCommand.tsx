import { Alert, Input, Modal, Typography } from 'antd'
import { useCallback, useState } from 'react'

import styles from './ParseCommand.module.scss'
import { parseCommandArgs } from './parseCommandArgs'

export function ParseCommand() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState('')

  const onClickParse = useCallback((command: string) => {
    const args = parseCommandArgs(command)

    console.log('args', args)
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <Alert
        message="Key Distributor CLI command support"
        type="info"
        description={
          <>
            You can{' '}
            <Typography.Link onClick={() => setIsModalOpen(true)}>
              parse a predefined command for Key Distributor CLI
            </Typography.Link>{' '}
            to autofill the form
          </>
        }
        showIcon
      />
      <Modal
        title="Parse a predefined command for Key Distributor CLI"
        open={isModalOpen}
        okText="Parse and autofill the form"
        onOk={() => onClickParse(value)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input.TextArea
          className={styles.Value}
          placeholder="Paste here your predefined command for Key Distributor CLI"
          onChange={({ target }) => setValue(target.value)}
          showCount
        />
      </Modal>
    </>
  )
}
