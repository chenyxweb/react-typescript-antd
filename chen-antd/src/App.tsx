import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div className='App'>
      <Button disabled>default</Button>
      <Button type={ButtonType.Primary}>Primary</Button>
      <Button type={ButtonType.Primary} disabled>
        Primary-disabled
      </Button>
      <Button type={ButtonType.Danger}>Danger</Button>
      <Button type={ButtonType.Primary} size={ButtonSize.Large}>
        Primary-large
      </Button>
      <Button type={ButtonType.Primary} size={ButtonSize.Small}>
        Primary-small
      </Button>
      <Button type={ButtonType.Link}>link</Button>
      <Button type={ButtonType.Link} disabled>
        link
      </Button>
    </div>
  )
}

export default App
