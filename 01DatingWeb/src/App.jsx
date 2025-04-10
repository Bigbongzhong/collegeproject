import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '../components/guidlines'
import Guidelines from '../components/guidlines'

function App() {
  const [count, setCount] = useState(0)
  
  function onC() {
    
  }
  return (
    <>
      <header className="site-header">
      <div className="header-left" onClick={onC}>
        <a>Guidelines</a>
      </div>
      <div className="header-right">
        <a>Login</a>
      </div>
    </header>
    <div className="containerForImageAndButton">
      <button className="create-account">Create Account</button>
    <main className="main-content" >
    </main>
    </div>
    <Guidelines />
    </>
  )
}

export default App
