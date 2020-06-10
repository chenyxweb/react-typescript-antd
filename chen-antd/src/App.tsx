import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/button'

function App() {
  return (
    <div className='App'>
      {/* 各种按钮 */}
      <Button disabled className={'hahaha'}>
        default
      </Button>
      <Button
        btnType={ButtonType.Primary}
        onClick={e => {
          e.preventDefault()
          console.log('click', e)
        }}
      >
        Primary
      </Button>
      <Button btnType={ButtonType.Primary} disabled>
        Primary-disabled
      </Button>
      <Button btnType={ButtonType.Danger}>Danger</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Primary-large
      </Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
        Primary-small
      </Button>
      <Button btnType={ButtonType.Link} target='_blank'>
        link
      </Button>
      <Button btnType={ButtonType.Link} disabled>
        link-disabled
      </Button>
    </div>
  )
}

export default App
