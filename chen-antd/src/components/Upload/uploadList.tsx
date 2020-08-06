import React, { FC } from 'react'
import { UploadFileItem } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/progress'

export interface UploadListProps {
  fileList: UploadFileItem[]
  onRemove?: (fileItem: UploadFileItem) => void
}

export const UploadList: FC<UploadListProps> = props => {
  const { fileList, onRemove } = props

  return (
    <ul className='viking-upload-list'>
      {fileList.map(item => {
        return (
          <li className='viking-upload-list-item' key={item.uid}>
            {/* 文件图标和文件名 */}
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon='file-alt' theme='secondary' />
              {item.name}
            </span>
            {/* 文件状态 */}
            <span className='file-status'>
              {item.status === 'uploading' && <Icon icon='spinner' spin theme='primary'></Icon>}
              {item.status === 'success' && <Icon icon='check-circle' theme='success'></Icon>}
              {item.status === 'error' ? <Icon icon='times-circle' theme='danger'></Icon> : null}
            </span>
            {/* 删除文件 */}
            <span className='file-actions'>
              <Icon icon='times' onClick={() => onRemove && onRemove(item)}></Icon>
            </span>
            {/* 进度条 */}
            {item.status === 'uploading' ? <Progress percent={item.percent || 0}></Progress> : null}
          </li>
        )
      })}
    </ul>
  )
}
