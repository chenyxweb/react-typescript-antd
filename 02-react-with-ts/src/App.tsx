import React, { useState } from 'react'
import logo from './logo.svg'
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

const App = () => {
  const [showMouseClick, toggleMouseClick] = useState(true)
  const position = useMousePosition()

  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [showMouseClick])
  const imgData = data as IData // 类型断言

  return (
    <div className='App'>
      <header className='App-header' style={{ paddingBottom: 100 }}>
        <img src={logo} className='App-logo' alt='logo' />

        {/* hello world */}
        <Hello message={'Hello React !!!'}></Hello>

        {/* useState  && useEffect*/}
        <LikeButton></LikeButton>

        {/* js也是支持的 */}
        <Index></Index>

        {/* useEffect 使用 */}
        <button onClick={() => toggleMouseClick(!showMouseClick)}>
          toggle MouseClick && refresh img
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
  )
}

export default App
