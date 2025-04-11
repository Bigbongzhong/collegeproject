import { useState, useRef, useEffect} from 'react'
import './App.css'
import '../components/guidlines'
import Guidelines from '../components/guidlines'
import Login from '../components/login'
import CreateAccount from "../components/createAccount"

function App() {
  const [guideShow, setGuideShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)
  const guideref = useRef();
  const loginref = useRef();
  useEffect(()=>{
  const handleClick = (e)=>{
    if(guideref.current && !guideref.current.contains(e.target)){
      setGuideShow(false)
      
    }
    console.log(e.target);
  };
  document.addEventListener('pointerdown', handleClick)
  return ()=>{
    document.removeEventListener('pointerdown', handleClick)
  };
},[guideref]);
  useEffect(()=>{
  const handleClick = (e)=>{
    if(loginref.current && !loginref.current.contains(e.target)){
      setLoginShow(false)
    }
  };
  document.addEventListener('click', handleClick)
  return ()=>{
    document.removeEventListener('click', handleClick)
  };
},[loginref]);
  return (
    <>
      {(guideShow || loginShow) && <div className="modalOverlay" />}
      <header className="site-header">
      <div className="header-left" onClick={()=>setGuideShow(!guideShow)} ref={guideref}>
        <a>Guidelines</a>
      </div>
      <div className="header-right" onClick={()=>setLoginShow(!loginShow)} ref={loginref}>
        <a>Login</a>
      </div>
    </header>
    <div className="containerForImageAndButton">
      <button className="create-account">Create Account</button>
    <main className="main-content" >
    </main>
    <CreateAccount />
    </div>
    <Guidelines show={guideShow}/>
    <Login show={loginShow}/>
    </>
  )
}

export default App
