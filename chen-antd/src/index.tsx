// 组件库入口文件

// 引入所有的图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// 对默认导入的组件, 进行非默认导出的写法
export { default as Button } from './components/Button'

export { default as Alert } from './components/Alert'

export { default as Menu } from './components/Menu'

export { default as Tabs } from './components/Tabs'

export { default as Icon } from './components/Icon'

export { default as Transition } from './components/Transition'

export { default as Input } from './components/Input'

export { default as AutoComplete } from './components/AutoComplete'

export { default as Upload } from './components/Upload'

export { default as Progress } from './components/Progress'
