import React, { FC, InputHTMLAttributes, ReactElement } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'
import { Icon } from '../Icon/icon'

type InputSize = 'lg' | 'sm'

/**
 * 问题:size和InputHTMLAttributes内置的size冲突
 * 解决: 1. 修改自定义的size; 2. 使用Omit<T,K>  : 从T选取所有属性,然后删除K来构造新的类型
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 是否禁用 */
  disabled?: boolean
  /** Input组件大小 */
  size?: InputSize
  /** 图标 */
  icon?: IconProp
  /** 前缀 */
  prepend?: string | ReactElement
  /** 后缀 */
  append?: string | ReactElement
}

/**
 * ### 引入
 * ~~~js
 * import { Input } from 'chen-antd'
 * ~~~
 */
export const Input: FC<InputProps> = props => {
  const { disabled, size, icon, style, prepend, append, className, ...restProps } = props
  const classes = classNames('viking-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })

  // 同时存在value和defaultValue时,删除defaultValue
  if ('value' in props) {
    delete restProps.defaultValue
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className='viking-input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`}></Icon>
        </div>
      )}
      <input disabled={disabled} type='text' className='viking-input-inner' {...restProps} />
      {append && <div className='viking-input-group-append'>{append}</div>}
    </div>
  )
}

export default Input
