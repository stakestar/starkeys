import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useCallback, useState } from 'react'

import { useAppState } from '../../hooks'
import { validateKeystorePassword } from '../../lib'

export function KeystoreFile() {
  const { actions } = useAppState()

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

  return (
    <Upload.Dragger beforeUpload={onBeforeUpload} accept=".json">
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag here your Keystore file</p>
      <p className="ant-upload-hint">*.json</p>
    </Upload.Dragger>
  )
}
