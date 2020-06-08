import React from 'react'
import logo from './logo.svg'
import './App.css'
import Hello from './components/Hello'
import UseStateDemo from './components/UseStateDemo'
import Index from './components/Index'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        {/* hello world */}
        <Hello message={'Hello React !!!'}></Hello>
        {/* useState */}
        <UseStateDemo></UseStateDemo>

        <Index></Index>
      </header>
    </div>
  )
}

export default App
