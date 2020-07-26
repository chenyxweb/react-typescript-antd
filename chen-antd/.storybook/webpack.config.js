module.exports = ({ config }) => {
  config.module.rules.push({
    // 处理tsx文件
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      }, 
      // 自动生成属性列表
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          // 将字符串枚举和联合将转换为docgen枚举格式 https://www.npmjs.com/package/react-docgen-typescript-loader#loader-options
          shouldExtractLiteralValuesFromEnum: true,
          // 过滤只显示自定义的属性
          propFilter: prop => {
            if (prop.parent) {
              return !prop.parent.fileName.includes('node_modules')
            }
            return true
          },
        },
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
