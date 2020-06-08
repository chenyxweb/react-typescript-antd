import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * @param url 请求地址
 * @param deps useEffect的依赖项
 */
const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null) // any 让data的类型由null变成any
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(url).then(res => {
      console.log(res)
      setData(res.data)
      setLoading(false)
    })
  }, deps)

  // return [data, loading] //
  return [data, loading]
}

export default useURLLoader
