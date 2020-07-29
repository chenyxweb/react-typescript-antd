import React from 'react'
import { storiesOf } from '@storybook/react'
import AutoComplete from '../components/AutoComplete/autoComplete'

// 模拟数据
const listData = [
  { value: 'bradley', number: 11 },
  { value: 'pope', number: 1 },
  { value: 'caruso', number: 4 },
  { value: 'cook', number: 2 },
  { value: 'cousins', number: 15 },
  { value: 'james', number: 23 },
  { value: 'AD', number: 3 },
  { value: 'green', number: 14 },
  { value: 'howard', number: 39 },
  { value: 'kuzma', number: 0 },
]

// 默认 AutoComplete 本地数据
const AutoCompleteDefault = () => {
  return (
    <AutoComplete
      placeholder='AutoComplete'
      style={{ width: 200 }}
      fetchSuggestions={value => {
        // 拿到输入的数据, 过滤出需要的数据
        return listData.filter(item => item.value.toUpperCase().includes(value.toUpperCase()))
      }}
      onSelect={item => {
        console.log(item)
      }}
    ></AutoComplete>
  )
}

// 自定义渲染项 AutoComplete 本地数据
const AutoCompleteCustomizeRenderItem = () => {
  return (
    <AutoComplete
      placeholder='AutoComplete'
      style={{ width: 200 }}
      fetchSuggestions={value => {
        // 拿到输入的数据, 过滤出需要的数据
        return listData.filter(item => item.value.toUpperCase().includes(value.toUpperCase()))
      }}
      onSelect={item => {
        console.log(item)
      }}
      renderOption={item => (
        <div>
          {item.value} --- {item.number}
        </div>
      )}
    ></AutoComplete>
  )
}

// 获取远程数据 AutoComplete
const AutoCompleteFetch = () => {
  return (
    <AutoComplete
      placeholder='AutoComplete'
      style={{ width: 200 }}
      fetchSuggestions={value => {
        return fetch(`https://api.github.com/search/users?q=${value}`)
          .then(res => res.json())
          .then(({ items }) => {
            console.log(items)
            // return 的数据 通过.then获取
            return (items || []).slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
          })
      }}
      onSelect={item => {
        console.log(item)
      }}
      renderOption={(item: any) => (
        <div>
          {item.value}---{item.id}
        </div>
      )}
    ></AutoComplete>
  )
}

storiesOf('AutoComplete', module)
  .add('默认的 AutoComplete', AutoCompleteDefault)
  .add('自定义渲染内容的 AutoComplete', AutoCompleteCustomizeRenderItem)
  .add('获取远程数据的 AutoComplete', AutoCompleteFetch)
