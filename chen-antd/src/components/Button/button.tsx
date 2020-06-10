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
  btnType?: ButtonType
  // type: 'default' | 'primary' | 'danger' | 'link'
  size?: ButtonSize
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

// 交叉类型 既有自定义的类型 又有原生button的类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// 将属性都设置成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
  const { className, btnType, size, disabled, children, style, ...restProps } = props
  // btn btn-primary btn-large ...
  const classes = classnames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: btnType === ButtonType.Link && disabled,
    },
    className
  )

  if (btnType === ButtonType.Link) {
    // a标签
    return (
      <a href='https://www.baidu.com' className={classes} style={style} {...restProps}>
        {children}
      </a>
    )
  } else {
    // 按钮
    return (
      <button className={classes} disabled={disabled} style={style} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnType: ButtonType.Default,
  disabled: false,
}

export default Button
