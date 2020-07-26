import React, { FC } from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

// 继承 FontAwesomeIcon 的props
interface IconProps extends FontAwesomeIconProps {
  // 图标颜色
  /** 图标主题颜色 */
  theme?: ThemeProps
}

export const Icon: FC<IconProps> = props => {
  const { className, theme, ...restProps } = props
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme,
  })

  return <FontAwesomeIcon className={classes} {...restProps} />
}

export default Icon
