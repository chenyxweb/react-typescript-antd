import React, { FC, useRef, ChangeEvent, useState } from 'react'
import Button from '../Button'
import axios from 'axios'
import { UploadList } from './uploadList'

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
  /** 默认列表 */
  defaultFileList?: UploadFileItem[]
  /** 移除文件 */
  onRemove?: (fileItem: UploadFileItem) => void
  /** 自定义header */
  header?: Headers
  /** 指定文件名 */
  fileName?: string
}

/** 文件列表的每一项的类型 */
export interface UploadFileItem {
  /** 文件id */
  uid: string
  /** 文件大小 */
  size: number
  /** 文件名 */
  name: string
  /** 文件状态 */
  status?: 'ready' | 'uploading' | 'success' | 'error'
  /** 上传百分比 */
  percent?: number
  /** 原始文件 */
  raw?: File
  /** 上传成功的信息 */
  response?: any
  /** 上传失败的信息 */
  error?: any
}

export const Upload: FC<UploadProps> = props => {
  const { action, onProgress, onSuccess, onError, beforeUpload, onChange, defaultFileList, onRemove } = props
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFileItem[]>(defaultFileList || []) // 文件列表

  // 点击上传文件按钮时
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // input标签 change的时候
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

  // 请求 将file文件上传
  const post = (file: File) => {
    // 1. 创建文件列表项
    const fileListItem: UploadFileItem = {
      uid: 'file' + Date.now(),
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file,
    }
    // 2. 保存到fileList内
    setFileList([fileListItem, ...fileList])
    // 3. 创建FormData,上传文件
    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-type': 'multipart/form-data', // 文件上传时需要设置 二进制
        },
        // 4. axios 支持监控上传进度, 上传过程中
        onUploadProgress: e => {
          let percentage = Math.round((e.loaded / e.total) * 100) || 0 // 计算百分比
          if (percentage < 100) {
            onProgress && onProgress(percentage, file)

            //  更新当前项信息
            setFileList(preFileList => {
              console.log(preFileList)
              // 拿到上一次setState后最新的列表, 返回需要新更新的值
              // 取得当前上传项,实时更新当前项的相关数据
              return preFileList.map(item => {
                if (item.uid === fileListItem.uid) {
                  return { ...item, percent: percentage, status: 'uploading' }
                } else {
                  return item
                }
              })
            })
          }
        },
      })
      .then(res => {
        // 上传成功
        onSuccess && onSuccess(res.data, file)
        onChange && onChange(file)

        //  更新当前项信息
        setFileList(preFileList => {
          console.log(preFileList)
          // 拿到上一次setState后最新的列表, 返回需要新更新的值
          // 取得当前上传项,实时更新当前项的相关数据
          return preFileList.map(item => {
            if (item.uid === fileListItem.uid) {
              return { ...item, percent: 100, status: 'success', response: res.data }
            } else {
              return item
            }
          })
        })
      })
      .catch(error => {
        // 上传失败
        onError && onError(error, file)
        onChange && onChange(file)

        //  更新当前项信息
        setFileList(preFileList => {
          console.log(preFileList)
          // 拿到上一次setState后最新的列表, 返回需要新更新的值
          // 取得当前上传项,实时更新当前项的相关数据
          return preFileList.map(item => {
            if (item.uid === fileListItem.uid) {
              return { ...item, status: 'error', error: error }
            } else {
              return item
            }
          })
        })
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
      <UploadList
        fileList={fileList}
        onRemove={fileItem => {
          console.log(fileItem)
          // 删除这一项
          setFileList(fileList.filter(item => item.uid !== fileItem.uid))

          onRemove && onRemove(fileItem)
        }}
      ></UploadList>
    </div>
  )
}

export default Upload
