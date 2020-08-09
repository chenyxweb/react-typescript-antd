import React, { FC, CSSProperties } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  /** 百分比 */
  percent: number
  /** 进度条高度 */
  progressHeight?: number
  /** 展示文字 */
  showText?: boolean
  /** 颜色 */
  styles?: CSSProperties
  /** 主题颜色 */
  theme?: ThemeProps
}

/**
 * ### 引入
 * ~~~js
 * import { Progress } form 'chen-antd'
 *
 * ~~~
 *
 */
export const Progress: FC<ProgressProps> = props => {
  const { percent, progressHeight, showText, styles, theme } = props
  return (
    <div className='viking-progress-bar' style={styles}>
      <div className='viking-progress-bar-outer' style={{ height: progressHeight }}>
        <div className={`viking-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText ? <span className='inner-text'>{percent + '%'}</span> : null}
        </div>
      </div>
    </div>
  )
}

// 默认值
Progress.defaultProps = {
  progressHeight: 15,
  showText: true,
  theme: 'primary',
}

export default Progress
