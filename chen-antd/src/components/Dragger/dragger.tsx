import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  /** 文件放下时的回调 */
  onDropFile: (fileList: FileList) => void
}

export const Dragger: FC<DraggerProps> = props => {
  const { children, onDropFile } = props
  const [isDragOver, setIsDragOver] = useState(false) // 是否拖拽进入

  // 拖拽进入时添加 is-dragover 类名
  const classes = classNames('viking-uploader-dragger', { 'is-dragover': isDragOver })
  return (
    <div
      className={classes}
      // 拖拽进入
      onDragOver={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      // 拖拽离开
      onDragLeave={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
      }}
      // 拖拽放下
      onDrop={(e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        // onDrop事件的e中拿到 当前拖拽的文件File对象
        // console.log(e.dataTransfer.files)
        // 子传父
        onDropFile(e.dataTransfer.files)
      }}
    >
      {children}
    </div>
  )
}

export default Dragger
