import { useEffect, useState } from 'react'

/**
 * @param value input框的值
 * @param delay 延时 ms
 */
const useDebounce = (value: string, delay: number) => {
  const [debounceInputValue, setDebounceInputValue] = useState(value)

  // 当value改变时 触发useEffect
  useEffect(() => {
    let timeId = setTimeout(() => {
      // 如果delay延时消失之后还没有输入操作的话,修改string
      setDebounceInputValue(value)
    }, delay)

    // 每一次重新执行useEffect 都会调用return内的函数
    return () => {
      // 如果delay时间隔时间内,有重新输入操作, 重置上一次设置的定时器
      clearTimeout(timeId)
    }
  }, [delay, value])

  // 返回debounce后的input框的值
  return [debounceInputValue]
}

export default useDebounce
