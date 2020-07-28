import React, { FC, ChangeEvent, useState, ReactElement } from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition'
import Icon from '../Icon/icon'
import classNames from 'classnames'

interface DataSourceObject {
  value: string
  number?: number
}
export type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** input时 实时返回输入框数据 */
  fetchSuggestions: (inputValue: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 选择下拉列表时 */
  onSelect?: (item: DataSourceType) => void
  /** 自定义渲染内容 */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
  const { onSelect, fetchSuggestions, renderOption, ...restProps } = props
  const [inputValue, setInputValue] = useState('') // 输入框内容
  const [filterOptions, setFilterOptions] = useState<DataSourceType[]>([]) // 过滤后的列表数据
  const [loading, setLoading] = useState(false) // 列表是否loading
  const [showDropdown, setShowDropdown] = useState(false) // 是否展示下拉列表
  const [highlightIndex, setHighlightIndex] = useState(-1) // 默认高亮的listItem

  // 处理input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim()
    setInputValue(inputValue)

    if (!inputValue.trim()) {
      // 为空
      setFilterOptions([])
      setShowDropdown(false)
    } else {
      // 不为空
      const result = fetchSuggestions(inputValue)
      if (result instanceof Promise) {
        // 如果函数返回值为promise, 等promise的结果
        setLoading(true)
        result.then(res => {
          setLoading(false)
          setFilterOptions(res)
        })
      } else {
        // 如果返回值为 DataSourceType[]
        setFilterOptions(result)
        if (result.length) {
          setShowDropdown(true)
        } else {
          setShowDropdown(false)
        }
      }
    }
  }

  // 点击列表项时
  const handleLiClick = (item: DataSourceType) => {
    // 赋值inputValue
    setInputValue(item.value)
    // 清空列表
    setFilterOptions([])
    // 返回给使用者
    onSelect && onSelect(item)
  }

  return (
    <div className='viking-auto-complete'>
      <Input value={inputValue} {...restProps} onChange={handleInputChange} />
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => {
          setFilterOptions([])
        }}
      >
        <ul className='viking-suggestion-list'>
          {loading && (
            <div className='suggstions-loading-icon'>
              <Icon icon='spinner' spin />
            </div>
          )}
          {filterOptions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleLiClick(item)}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                {renderOption ? renderOption(item) : item.value}
              </li>
            )
          })}
        </ul>
      </Transition>
    </div>
  )
}

export default AutoComplete
