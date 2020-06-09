## useState

## useEffect

- 不需要清除的副作用

  ```tsx
    // 不需要清除的effect
    // 默认情况下,每次渲染都会执行useEffect
    useEffect(() => {
      document.title = `点击了 ${count} 次`
    })
  ```

- 需要清除的副作用

  ```tsx
    // 需要清除的effect
    // 当effect内有定时器时,需要清除定时器
    // 默认情况下, 每次渲染都会重新执行 useEffect, 重新执行return内的回调函数
    // useEffect 不会阻塞渲染, 会在渲染完成之后执行
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
        console.log('addEvent')
      }
      // 添加事件
      document.addEventListener('click', handleClick)
  
      // 移除事件
      return () => {
        console.log('removeEvent')
        document.removeEventListener('click', handleClick)
      }
    })
  
  // ...
  console.log('before-render')
  ```

  

- 控制副作用是否执行

  ```tsx
    // 需要清除的effect
    // 当effect内有定时器时,需要清除定时器
    // 默认情况下, 每次渲染都会重新执行 useEffect , 重新执行return内的回调函数
    // useEffect 不会阻塞渲染, 会在渲染完成之后执行
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
      }
      // 添加事件
      console.log('addEvent')
      document.addEventListener('click', handleClick)
  
      // 移除事件
      // 添加依赖, 仅当依赖项发生改变是 effect 才会重新生效
      // 加一个空的依赖,此时相当于componentWillUnmount, 组件卸载的时候才会执行
  
      return () => {
        console.log('removeEvent')
        document.removeEventListener('click', handleClick)
      }
    }, [])
  ```

  

## 自定义hook vs HOC

### 基本实现

  >  将组件的状态逻辑提取到可重用的函数中进行复用

  > 注意: 
  >
  > + 自定义hook函数名必须以use开头, 不用的话无法判断函数内部是否有useEffect等的使用
  > + 两个地方使用的相同hook状态不会共享, 相互隔离

  ```ts
  // 1. 定义
  // 自定义hook(实现状态逻辑的复用,类似于class组件中的HOC), 记录光标位置的hook
  import { useState, useEffect } from 'react'
  
  const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
  
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY })
      }
      document.addEventListener('mousemove', handleClick)
  
      return () => {
        document.removeEventListener('mousemove', handleClick)
      }
    }, [])
  
    // 返回这个状态
    return position
  }
  
  export default useMousePosition
  
  ```

  ```tsx
  // 2. 使用
  import useMousePosition from './hooks/useMousePosition'
  const position = useMousePosition()
  return <div>{`${position.x}---${position.y}`}</div>
  ```

### hook实现(图片加载中提示)

```ts
// 自定义hook
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

```

```tsx
import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Hello from './components/Hello'
import LikeButton from './components/LikeButton'
import Index from './components/Index'
import MouseClick from './components/MouseClick'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

interface IData {
  message: string
  status: string
}

const App = () => {
  const [showMouseClick, toggleMouseClick] = useState(true)
  const position = useMousePosition()

  // effect更新-->重新渲染
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
      </header>
    </div>
  )
}

export default App

```



### HOC 高阶组件实现(图片加载中提示)
>  HOC的弊端:
>
> - 无端的添加页面结构
> -  ...难

```tsx
// 1. 定义
// 定义一个发送请求时展示loading的高阶组件
// high order component

import React from 'react'
import axios from 'axios'

interface ILoaderState {
  data: any,
  isLoading: boolean
}
interface ILoaderProps {
  data: any,
}
const withLoader = <P extends ILoaderState>(WrappedComponent: React.ComponentType<P>, url: string) => {
  return class LoaderComponent extends React.Component<Partial<ILoaderProps>, ILoaderState> {
    constructor(props: any) {
      super(props)
      this.state = {
        data: null,
        isLoading: false
      }
    }
    componentDidMount() {
      this.setState({
        isLoading: true,
      })
      axios.get(url).then(result => {
        this.setState({
          data: result.data,
          isLoading: false
        })
      })
    }
    render() {
      const { data, isLoading } = this.state
      return (
        <>
          { (isLoading || !data) ? <p>data is loading</p> :
            <WrappedComponent {...this.props as P} data={data} />
          }
        </>
      )
    }
  }
}

export default withLoader
```

```tsx
// 2. 使用
import withLoader from './comopnents/withLoader'

interface IDogShow {
    message: string
    status: string
}

// 定义组件, 拿到高阶组件传递的data
const Dogshow: React.FC<{data: IDogShow}> = ({data})=>{
    return (
    	<>
         <h2>{data.status}</h2>
        <img src={data.message} />
        </>
    )
}

// 高阶组件加持
const WrappedDogShow = withLoader(Dogshow, https://dog.ceo/dog-api/documentation/random)
 
// 渲染                                  
<WrappedDogShow />                           
```

## useRef  多次渲染之间的纽带

> 1. `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。
>
> 2. 当 ref 对象内容发生变化时，`useRef` 并*不会*通知你。变更 `.current` 属性不会引发组件重新渲染

用法:

```js
const refContainer = useRef(initialValue);
```

用途:

- 获取dom元素 (无论该节点如何改变，React 都会将 ref 对象的 `.current` 属性设置为相应的 DOM 节点)

- 很方便地保存任何可变值 ,这个值在组件的整个生命周期内保持不变(类似于class组件中初始化一个非响应式的值)

- [如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码,则需要使用回调 ref 来实现](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)

- 模拟componentDidUpdate

```js
    // useRef 的使用  demo
    import React, { useRef, useEffect } from 'react'
    
    const UseRefDemo = () => {
      const didMountRef = useRef(false)
      // 泛型声明input元素
      const inputRef = useRef<HTMLInputElement>(null)
    
      const count = useRef(0)
      let count1 = 0
    
      // 4. 模拟componentDidUpdate
      useEffect(() => {
        if (didMountRef.current) {
          // 重新渲染
          // console.log('update')
        } else {
          // 第一次渲染
          console.log('didMount')
          didMountRef.current = true
        }
      })
    
      return (
        <div>
          {/* 1. input获取焦点 */}
          <input type='text' ref={inputRef} />
          <br />
          <button
            onClick={() => {
              inputRef.current?.focus()
            }}
          >
            input框获取焦点
          </button>
          <br />
    
          {/*  */}
          {/* 2. 初始化非响应式的数据 */}
          <button
            onClick={() => {
              count.current++
              count1++
              console.log(count.current) // 组件重新渲染,不会影响count的数据
              console.log(count1) // 组件重新render后,count1就会恢复到0
            }}
          >
            count++
          </button>
        </div>
      )
    }
    
    export default UseRefDemo
    
```

 ## useContext

> 组件之间共享数据, 全局的数据, 例如: 语言,  用户, 主题等
>
> 好处: 不需要通过props一层层传递(透传)

```tsx
// 主题案例

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


return (
<ThemeContext.Provider value={globalTheme}>
    ...
</ThemeContext.Provider>
)


```

```tsx
import {useContext } from 'react'
import { ThemeContext } from '../App'

const theme = useContext(ThemeContext)
const style = {
    color: theme.color,
    backgroundColor: theme.background,
}

<button style={style}></button>
```

