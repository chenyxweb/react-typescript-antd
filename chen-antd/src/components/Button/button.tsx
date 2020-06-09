import React from 'react'
import classnames from 'classnames'

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Default = 'default',
  Primary = 'primary',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  children: React.ReactNode
  type?: ButtonType
  // type: 'default' | 'primary' | 'danger' | 'link'
  size?: ButtonSize
  disabled?: boolean
  className?: string
  style?: CSSStyleDeclaration
}

const Button: React.FC<BaseButtonProps> = props => {
  const { className, type, size, disabled, children } = props
  console.log(props)
  // btn btn-primary btn-large ...
  const classes = classnames(
    'btn',
    {
      [`btn-${type}`]: type,
      [`btn-${size}`]: size,
      disabled: type === ButtonType.Link && disabled,
    },
    className
  )

  if (type === ButtonType.Link) {
    // a标签
    return (
      <a href='https://www.baidu.com' className={classes}>
        百度一下
      </a>
    )
  } else {
    // 按钮
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  type: ButtonType.Default,
  disabled: false,
}

export default Button
