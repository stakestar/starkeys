import { Input, Typography } from 'antd'
import { useCallback } from 'react'

import { useAppState } from '../../hooks'
import styles from './Operators.module.scss'

export function Operators() {
  const {
    actions,
    values: { operators },
    errors
  } = useAppState()

  const onChange = useCallback(
    ({ index, column, value }: { index: number; column: 'id' | 'publicKey'; value: string }) => {
      actions.setOperators((currentOperators) => {
        return currentOperators.map((currentOperator, currentIndex) => {
          if (currentIndex === index) {
            return {
              ...currentOperator,
              [column]: value.trim()
            }
          }

          return { ...currentOperator }
        })
      })
    },
    [actions]
  )

  return (
    <div>
      <div className={styles.Header}>
        <Typography className={styles.Column1}>Id</Typography>
        <Typography className={styles.Column2}>Public key</Typography>
      </div>
      {operators.map((operator, index) => (
        <Input.Group className={styles.Group} key={index} compact>
          <div className={styles.Number}>{index + 1}.</div>
          <Input
            placeholder="Input id"
            className={styles.Column1}
            value={operator.id}
            onChange={({ target }) => onChange({ index, column: 'id', value: target.value })}
            status={!operator.id && errors.operators[index].id ? 'error' : null}
          />
          <Input
            placeholder="Input public key"
            className={styles.Column2}
            value={operator.publicKey}
            onChange={({ target }) => onChange({ index, column: 'publicKey', value: target.value })}
            status={!operator.publicKey && errors.operators[index].publicKey ? 'error' : null}
          />
        </Input.Group>
      ))}
    </div>
  )
}
