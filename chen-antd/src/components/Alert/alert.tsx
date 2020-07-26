import React, { FC, useRef } from 'react'
import classNames from 'classnames'

interface AlertProps {
  /** 弹框类型 */
  type?: 'default' | 'success' | 'warning' | 'danger'
  /** 弹框标题 */
  title: string
  /** 弹框描述 */
  description?: string
  /** 是否展示关闭按钮 */
  closeable?: boolean
  /** 关闭回调 */
  onClose?: () => void
}

export const Alert: FC<AlertProps> = ({ type, title, description, closeable, onClose }) => {
  const domRef = useRef<HTMLDivElement>(null)
  const classes = classNames('alert', { [type as string]: type })
  return (
    <div className={classes} ref={domRef}>
      {closeable ? (
        <div
          className='close'
          onClick={() => {
            const div = domRef.current
            div?.parentElement?.removeChild(div)
            onClose && onClose()
          }}
        >
          ×
        </div>
      ) : null}
      <p className='title'>{title}</p>
      {description ? <p className='description'>{description}</p> : null}
    </div>
  )
}

Alert.defaultProps = {
  type: 'default',
  closeable: true,
}

export default Alert
