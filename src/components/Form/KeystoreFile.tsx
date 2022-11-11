import { CloseOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import classNames from 'classnames'
import { MouseEvent, useCallback, useState } from 'react'

import { useAppState } from '../../hooks'
import styles from './KeystoreFile.module.scss'

export function KeystoreFile() {
  const {
    actions,
    values: { keystoreFile },
    errors
  } = useAppState()

  const [isError, setIsError] = useState(false)

  const onBeforeUpload = useCallback(
    (file: RcFile) => {
      setIsError(false)

      actions.setKeystoreFile(file)

      return false
    },
    [actions]
  )

  const onClickCancel = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation()
    actions.setKeystoreFile(null)
  }

  return (
    <Upload.Dragger
      className={classNames(styles.KeystoreFile, {
        [styles.error]: !keystoreFile && (isError || errors.keystoreFile)
      })}
      beforeUpload={onBeforeUpload}
      accept=".json"
      showUploadList={false}
    >
      <div className={classNames(styles.EmptyState, { [styles.invisible]: keystoreFile })}>
        <p>Click or drag here your Keystore file</p>
        <p className="ant-upload-hint">*.json</p>
      </div>
      <div
        className={classNames(styles.Cancel, { [styles.visible]: keystoreFile })}
        onClick={onClickCancel}
      >
        {keystoreFile?.name}
        <CloseOutlined className={styles.CancelIcon} />
      </div>
      <div className={classNames(styles.Error, { [styles.active]: isError })}>
        Invalid Keystore file
      </div>
    </Upload.Dragger>
  )
}
