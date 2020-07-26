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
import '../src/styles/index.scss'
import React from 'react'
import { withInfo } from '@storybook/addon-info'

const storyWrapper = (storyFn: any) => (
  <div style={{ padding: '20px 40px' }}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)

// 对组件位置 添加样式
addDecorator(storyWrapper)

// 添加组件信息
addDecorator(withInfo)

// 默认展示信息
addParameters({ info: { inline: true, header: false } })

configure(require.context('../src', true, /\.stories\.tsx$/), module)
