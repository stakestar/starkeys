import { Input, Typography } from 'antd'
import Link from 'antd/lib/typography/Link'
import { useCallback } from 'react'

import { useAppState } from '../../hooks'
import { getOperatorUrl } from '../../lib'
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
        <Typography className={styles.Column1}>Operator ID</Typography>
        <Typography className={styles.Column2}>Operator Public Key</Typography>
      </div>
      {operators.map((operator, index) => (
        <Input.Group className={styles.Group} key={index} compact>
          <div className={styles.Number}>
            {operator.id ? (
              <Link href={getOperatorUrl(operator.id)} target="_blank">
                {index + 1}.
              </Link>
            ) : (
              <span>{index + 1}.</span>
            )}
          </div>
          <div></div>
          <Input
            placeholder="Input id"
            className={styles.Column1}
            value={operator.id}
            onChange={({ target }) => onChange({ index, column: 'id', value: target.value })}
            status={errors.operators[index].id ? 'error' : null}
          />
          <Input
            placeholder="Input public key"
            className={styles.Column2}
            value={operator.publicKey}
            onChange={({ target }) => onChange({ index, column: 'publicKey', value: target.value })}
            status={errors.operators[index].publicKey ? 'error' : null}
          />
        </Input.Group>
      ))}
    </div>
  )
}
