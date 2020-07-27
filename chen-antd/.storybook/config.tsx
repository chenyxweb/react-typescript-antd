// import { configure, addDecorator, addParameters } from '@storybook/react';
// import { withInfo } from '@storybook/addon-info'
// import React from 'react'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import "../src/styles/index.scss"
// library.add(fas)
// const wrapperStyle: React.CSSProperties = {
//   padding: '20px 40px'
// }

// const storyWrapper = (stroyFn: any) => (
//   <div style={wrapperStyle}>
//     <h3>组件演示</h3>
//     {stroyFn()}
//   </div>
// )
// addDecorator(storyWrapper)
// addDecorator(withInfo)
// addParameters({info: { inline: true, header: false}})
// const loaderFn = () => {
//   const allExports = [require('../src/welcome.stories.tsx')];
//   const req = require.context('../src/components', true, /\.stories\.tsx$/);
//   req.keys().forEach(fname => allExports.push(req(fname)));
//   return allExports;
// };

// // automatically import all files ending in *.stories.js
// configure(loaderFn, module);

import { configure, addDecorator, addParameters } from '@storybook/react'
import '../src/styles/index.scss' // 引入样式文件
import React from 'react'
import { withInfo } from '@storybook/addon-info'
// 引入所有的图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// 全局控制组件展示样式
const storyWrapper = (storyFn: any) => (
  <div style={{ padding: '20px 40px' }}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

addDecorator(storyWrapper)

// 全局添加组件信息
addDecorator(withInfo)

// 全局默认展示信息
addParameters({ info: { inline: true, header: false } })

configure(require.context('../src', true, /\.stories\.tsx$/), module)
