import { Alert, Input, InputRef, Modal, Typography } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useAppState } from '../../hooks'
import styles from './ParseCommand.module.scss'
import { parseCommandArgs } from './parseCommandArgs'

export function ParseCommand() {
  const { actions } = useAppState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [value, setValue] = useState('')
  const ref = useRef<InputRef>(null)

  useEffect(() => {
    if (isModalOpen) {
      ref.current?.focus()
    }
  }, [isModalOpen])

  const onClickParse = useCallback(
    (command: string) => {
      const { operatorsIds, operatorsKeys, ssvTokenAmount } = parseCommandArgs(command)

      if (operatorsIds.length) {
        actions.setOperators((currentOperators) => {
          const operators = currentOperators.map((operator) => Object.assign({}, operator))

          operatorsIds.forEach((id, index) => {
            operators[index].id = id
          })

          return operators
        })
      }

      if (operatorsKeys.length) {
        actions.setOperators((currentOperators) => {
          const operators = currentOperators.map((operator) => Object.assign({}, operator))

          operatorsKeys.forEach((publicKey, index) => {
            operators[index].publicKey = publicKey
          })

          return operators
        })
      }

      if (ssvTokenAmount.length) {
        actions.setSsvAmount(ssvTokenAmount)
      }

      setValue('')
      setIsModalOpen(false)
    },
    [actions]
  )

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
          ref={ref}
          className={styles.Value}
          placeholder="Paste here your predefined command for Key Distributor CLI"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          showCount
        />
      </Modal>
    </>
  )
}
