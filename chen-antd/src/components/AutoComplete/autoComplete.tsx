import React, { FC, ChangeEvent, useState, ReactElement } from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition'
import Icon from '../Icon/icon'
import classNames from 'classnames'

interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 数据列表 */
  options: Array<DataSourceType>
  /** input时 实时返回输入框数据 */
  fetchSuggestions: (inputValue: string) => void
  /** 选择下拉列表时 */
  onSelect?: (item: DataSourceType) => void
  /** 自定义渲染内容 */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = props => {
  const { onSelect, options, fetchSuggestions, renderOption, ...restProps } = props
  const [inputValue, setInputValue] = useState('') // 输入框内容
  const [filterOptions, setFilterOptions] = useState<DataSourceType[]>([]) // 过滤后的列表数据
  const [loading, setLoading] = useState(false) // 列表是否loading
  const [showDropdown, setShowDropdown] = useState(false) // 是否展示下拉列表

  // 处理input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim()
    setInputValue(inputValue)
    fetchSuggestions(inputValue)
    const filterOptions = options.filter(item => item.value.includes(inputValue))
    setFilterOptions(filterOptions)

    if (filterOptions.length) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
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
              <li key={index} className={cnames} onClick={() => handleLiClick(item)}>
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
