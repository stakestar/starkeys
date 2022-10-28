import { CloseOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import classNames from 'classnames'
import { MouseEvent, useCallback } from 'react'

import { useAppState } from '../../hooks'
import { validateKeystorePassword } from '../../lib'
import styles from './KeystoreFile.module.scss'

export function KeystoreFile() {
  const { actions, keystoreFile } = useAppState()

  const onBeforeUpload = useCallback(
    (file: RcFile) => {
      const reader = new FileReader()

      reader.readAsText(file)
      reader.onload = ({ target }) => {
        validateKeystorePassword(target.result.toString(), 'qweqweqwe').then(console.log)
      }
      reader.onerror = (e) => {
        console.log(e)
      }

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
      className={styles.KeystoreFile}
      beforeUpload={onBeforeUpload}
      accept=".json"
      showUploadList={false}
    >
      <div className={classNames(styles.EmptyState, { [styles.invisible]: keystoreFile })}>
        <p className="ant-upload-text">Click or drag here your Keystore file</p>
        <p className="ant-upload-hint">*.json</p>
      </div>
      <div
        className={classNames(styles.Cancel, { [styles.visible]: keystoreFile })}
        onClick={onClickCancel}
      >
        {keystoreFile?.name}
        <CloseOutlined className={styles.CancelIcon} />
      </div>
    </Upload.Dragger>
  )
}
