import { useState } from 'react'
import './App.css'
import '../components/guidlines'
import Guidelines from '../components/guidlines'
import Login from '../components/login'

function App() {
  const [guideShow, setGuideShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)
  function onC() {
    
  }
  return (
    <>
      <header className="site-header">
      <div className="header-left" onClick={()=>setGuideShow(!guideShow)}>
        <a>Guidelines</a>
      </div>
      <div className="header-right" onClick={()=>setLoginShow(!loginShow)}>
        <a>Login</a>
      </div>
    </header>
    <div className="containerForImageAndButton">
      <button className="create-account">Create Account</button>
    <main className="main-content" >
    </main>
    </div>
    <Guidelines show={guideShow}/>
    <Login show={loginShow}/>
    </>
  )
}

export default App
