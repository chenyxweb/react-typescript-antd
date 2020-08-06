import React, { FC, useRef, ChangeEvent } from 'react'
import Button from '../Button'
import axios from 'axios'

export interface UploadProps {
  /** 上传地址 */
  action: string
  /** 上传过程 */
  onProgress?: (percentage: number, file: File) => void
  /** 上传成功 */
  onSuccess?: (res: any, file: File) => void
  /** 上传错误 */
  onError?: (err: any, file: File) => void
  /** 上传状态改变: 成功失败时都触发 */
  onChange?: (file: File) => void
  /** 上传之前 */
  beforeUpload?: (file: File) => boolean | Promise<File>
}

export const Upload: FC<UploadProps> = props => {
  const { action, onProgress, onSuccess, onError, beforeUpload, onChange } = props
  const inputRef = useRef<HTMLInputElement>(null)

  // 点击上传文件按钮时
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    // 上传文件(uploadFile变量可以先使用后声明)
    uploadFile(files)
    // 清空input
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  // 上传文件
  const uploadFile = (files: FileList) => {
    // 将FileList转化成真数组
    const reqFiles = Array.from(files)
    reqFiles.forEach((file: File) => {
      // 上传之前处理
      if (beforeUpload) {
        // 如果有传入 beforeUpload
        const res = beforeUpload(file)
        if (res && res instanceof Promise) {
          // beforeUpload 返回值为promise
          res.then(resp => {
            post(resp)
          })
        } else {
          // beforeUpload 返回 boolean
          if (res) {
            // 返回值为true时才进行上传
            post(file)
          }
        }
      } else {
        // 没有传入 beforeUpload
        post(file)
      }
    })
  }

  // 请求
  const post = (file: File) => {
    // 创建FormData
    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-type': 'multipart/form-data', // 文件上传时需要设置 二进制
        },
        // axios 支持监控上传进度
        onUploadProgress: e => {
          let percentage = Math.round((e.loaded / e.total) * 100) || 0 // 计算百分比
          if (percentage < 100) {
            onProgress && onProgress(percentage, file)
          }
        },
      })
      .then(res => {
        // 上传成功
        onSuccess && onSuccess(res.data, file)
        onChange && onChange(file)
      })
      .catch(error => {
        // 上传失败
        onError && onError(error, file)
        onChange && onChange(file)
      })
  }

  return (
    <div className='viking-upload-component'>
      <Button btnType='primary' onClick={handleButtonClick}>
        上传文件
      </Button>
      <input
        onChange={handleInputChange}
        type='file'
        ref={inputRef}
        className='viking-file-input'
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default Upload
