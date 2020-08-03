import React, { FC, ChangeEvent, useState, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition'
import Icon from '../Icon/icon'
import classNames from 'classnames'
import useDebounce from '../../hooks/useDebounce'
import useClickOutsideComponent from '../../hooks/useClickOutsideComponent'

interface DataSourceObject {
  value: string
  number?: number
}
export type DataSourceType<T = {}> = T & DataSourceObject

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** input时 实时获取输入框数据. 返回值为过滤后的列表数据或者promise,列表数据提供给组件渲染使用 */
  fetchSuggestions: (inputValue: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 选择下拉列表时 */
  onSelect?: (item: DataSourceType) => void
  /** 自定义渲染内容 */
  renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * ### 引入
 * ~~~js
 * import { AutoComplete } form 'chen-antd'
 *
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = props => {
  const { onSelect, fetchSuggestions, renderOption, ...restProps } = props
  const [inputValue, setInputValue] = useState('') // 输入框内容
  const [filterOptions, setFilterOptions] = useState<DataSourceType[]>([]) // 过滤后的列表数据
  const [loading, setLoading] = useState(false) // 列表是否loading
  const [showDropdown, setShowDropdown] = useState(false) // 是否展示下拉列表
  const [highlightIndex, setHighlightIndex] = useState(-1) // 默认高亮的listItem

  const [debounceInputValue] = useDebounce(inputValue, 500) // 生成延时更新的数据 debounceInputValue
  // console.log(debounceInputValue)

  const useEffectFlag = useRef(true) // useRef 创建的 useEffectFlag 不会随着函数组件的重新调用而改变
  // enter 之后 --> inputValue 改变 --> useEffect 调用,  这个过程是不需要发生的,需要一个flag记录是否需要调用useEffect

  const autoCompleteRef = useRef<HTMLDivElement>(null)

  // 当debounceInputValue改变时, 设置下拉框展示,loading状态,列表数据
  // 防抖
  useEffect(() => {
    if (!useEffectFlag.current) return
    if (!debounceInputValue.trim()) {
      // 为空
      setFilterOptions([])
      setShowDropdown(false)
      setLoading(false)
    } else {
      // 不为空
      const result = fetchSuggestions(debounceInputValue)
      if (result instanceof Promise) {
        // 如果函数返回值为promise, 等promise的结果--请求获取数据
        setLoading(true)
        setFilterOptions([])
        result
          .then(res => {
            setLoading(false)
            setFilterOptions(res)
            setShowDropdown(true)
          })
          .catch(err => console.log(err))
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
  }, [fetchSuggestions, debounceInputValue])

  // 点击组件外关闭下拉菜单功能

  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     console.log(e.target)
  //     // 如果 dom 中没有这个节点 或者这个节点包括了点击的这个元素 return
  //     if (!autoCompleteRef.current || autoCompleteRef.current.contains(e.target as HTMLElement)) return
  //     // 关闭下拉菜单
  //     setFilterOptions([])
  //   }

  //   document.addEventListener('click', handleClick)
  //   return () => {
  //     document.removeEventListener('click', handleClick)
  //   }
  // }, [])

  // 封装成自定义hook
  useClickOutsideComponent(autoCompleteRef, () => {
    // 关闭下拉菜单
    setFilterOptions([])
  })

  // 处理input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setInputValue(value)
    // 去掉高亮项
    setHighlightIndex(-1)
    useEffectFlag.current = true // 可以开始查询列表
  }

  // 点击列表项时
  const handleLiClick = (item: DataSourceType) => {
    // 赋值inputValue
    setInputValue(item.value)
    // 清空列表
    setFilterOptions([])
    // 返回给使用者
    onSelect && onSelect(item)
    useEffectFlag.current = false // 阻止查询列表
  }

  // 键盘按下时
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log('keyCode', e.keyCode)
    let index: number = highlightIndex
    switch (e.keyCode) {
      case 38:
        // 上箭头 --
        index = highlightIndex - 1
        if (index <= 0) {
          setHighlightIndex(0)
        } else {
          setHighlightIndex(index)
        }
        break

      case 40:
        // 下箭头 ++
        index = highlightIndex + 1
        if (index >= filterOptions.length - 1) {
          setHighlightIndex(filterOptions.length - 1)
        } else {
          setHighlightIndex(index)
        }
        break

      case 27:
        // esc
        // 隐藏
        setShowDropdown(false)

        break

      case 13:
        // enter
        // 设置当前index项为选中
        const dataItem = filterOptions.find((item, i) => i === index)
        if (dataItem?.value) {
          const selectValue = dataItem?.value || ''
          setInputValue(selectValue)
          // 清空列表
          setFilterOptions([])
          // 返回给使用者
          onSelect && onSelect(dataItem)

          useEffectFlag.current = false // 阻止查询列表
        }
        break

      default:
        break
    }
  }

  return (
    <div className='viking-auto-complete' ref={autoCompleteRef}>
      <Input value={inputValue} {...restProps} onChange={handleInputChange} onKeyDown={handleKeyDown} />
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
