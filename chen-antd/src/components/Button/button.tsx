import React, { FC, ReactNode, CSSProperties, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'

// export enum ButtonSize {
//   Large = 'lg',
//   Small = 'sm',
// }

// export enum ButtonType {
//   Default = 'default',
//   Primary = 'primary',
//   Danger = 'danger',
//   Link = 'link',
// }

// /** */ 此类型的注释, 可以添加属性描述
interface BaseButtonProps {
  /** 子节点 */
  children: ReactNode
  /** 按钮类型 */
  btnType: 'default' | 'primary' | 'danger' | 'link'
  /** 按钮大小 */
  size?: 'lg' | 'sm'
  /** 是否禁用 */
  disabled?: boolean
  /** 类名 */
  className?: string
  /** 自定义样式 */
  style?: CSSProperties
}

// 交叉类型 既有自定义的类型 又有原生button的类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// 将属性都设置成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = props => {
  const { className, btnType, size, disabled, children, style, ...restProps } = props
  // btn btn-primary btn-large ...
  const classes = classnames(
    'btn',
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: btnType === 'link' && disabled,
    },
    className
  )

  if (btnType === 'link') {
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
  btnType: 'default',
  disabled: false,
}

export default Button
