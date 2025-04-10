import { useState } from 'react'
import './App.css'
import '../components/guidlines'
import Guidelines from '../components/guidlines'

function App() {
  const [guideShow, setGuideShow] = useState(false)
  
  function onC() {
    
  }
  return (
    <>
      <header className="site-header">
      <div className="header-left" onClick={()=>setGuideShow(!guideShow)}>
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
    <Guidelines show={guideShow}/>
    </>
  )
}

export default App
