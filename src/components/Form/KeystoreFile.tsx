import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useCallback, useState } from 'react'

export function KeystoreFile() {
  const [value, setValue] = useState<RcFile>()

  const onBeforeUpload = useCallback((file: RcFile) => {
    setValue(file)

    return false
  }, [])

  console.log('value', value)

  return (
    <Upload.Dragger beforeUpload={onBeforeUpload}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag here your Keystore file</p>
      <p className="ant-upload-hint">*.json</p>
    </Upload.Dragger>
  )
}
