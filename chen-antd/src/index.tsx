import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
// 引入所有的图标
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

ReactDOM.render(<App />, document.getElementById('root'))
