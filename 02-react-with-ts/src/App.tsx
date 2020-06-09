import React, { useState } from 'react'
// import logo from './logo.svg'
import './App.css'
import Hello from './components/Hello'
import LikeButton from './components/LikeButton'
import Index from './components/Index'
import MouseClick from './components/MouseClick'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import UseRefDemo from './components/UseRefDemo'

interface IData {
  message: string
  status: string
}

// 主题色
interface ITheme {
  [key: string]: { color: string; background: string }
}

const theme: ITheme = {
  light: {
    color: '#000',
    background: '#eee',
  },
  dark: {
    color: '#fff',
    background: '#222',
  },
}

export const ThemeContext = React.createContext(theme.light)

const App = () => {
  const [showMouseClick, toggleMouseClick] = useState(true)
  const [globalTheme, setGlobalTheme] = useState(theme.light)
  const position = useMousePosition()

  // effect更新-->重新渲染
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [showMouseClick])
  const imgData = data as IData // 类型断言

  return (
    <ThemeContext.Provider value={globalTheme}>
      <div className='App'>
        <header className='App-header'>
          {/* hello world */}
          <Hello message={'Hello React !!!'}></Hello>

          {/* 切换主题 */}
          <button
            onClick={() => {
              setGlobalTheme(theme.light)
            }}
          >
            亮色主题
          </button>
          <button
            onClick={() => {
              setGlobalTheme(theme.dark)
            }}
          >
            暗色主题
          </button>

          {/* useState  && useEffect*/}
          <LikeButton></LikeButton>

          {/* js也是支持的 */}
          <Index></Index>

          {/* useEffect 使用 */}
          <button onClick={() => toggleMouseClick(!showMouseClick)}>
            toggle MouseClick && refresh dog img
          </button>
          {showMouseClick && <MouseClick></MouseClick>}

          {/* 自定义hook */}
          <div>{`${position.x}---${position.y}`}</div>

          {/* 图片加载提示  自定义hook使用 */}
          {loading ? (
            <div>狗狗图片正在加载中...</div>
          ) : (
            <img src={imgData?.message} width={400} alt='' />
          )}

          {/* useRef */}
          <UseRefDemo></UseRefDemo>
        </header>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
