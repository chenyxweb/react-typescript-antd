import React from 'react'
import Button from './components/Button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'

function App() {
  return (
    <div className='App'>
      {/* Button */}
      <Button disabled className={'hahaha'}>
        default
      </Button>
      <Button
        btnType='primary'
        onClick={e => {
          e.preventDefault()
          console.log('click', e)
        }}
      >
        Primary
      </Button>
      <Button btnType='primary' disabled>
        Primary-disabled
      </Button>
      <Button btnType='danger'>Danger</Button>
      <Button btnType='primary' size='lg'>
        Primary-large
      </Button>
      <Button btnType='primary' size='sm'>
        Primary-small
      </Button>
      <Button btnType='link' target='_blank'>
        link
      </Button>
      <Button btnType='link' disabled>
        link-disabled
      </Button>

      {/* Menu */}
      <Menu
        defaultIndex={0}
        // mode='vertical'
        onSelect={index => {
          console.log(index)
        }}
      >
        <MenuItem>111</MenuItem>
        <MenuItem disabled>222</MenuItem>
        <MenuItem>333</MenuItem>
        <MenuItem>444</MenuItem>
      </Menu>
    </div>
  )
}

export default App
