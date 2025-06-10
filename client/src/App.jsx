import { useState, useRef, useEffect} from 'react'
import './App.css'
import Guidelines from '../components/guidlines'
import Login from '../components/login'
import CreateAccount from "../components/createAccount"
import VerifyEmail from '../components/verifyEmail'
import Webfooter from "../components/footer"
import { Toaster } from 'react-hot-toast'

function App() {
  const [guideShow, setGuideShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)
  const [accountShow, setAccountShow] = useState(false)
  const overlayRef = useRef(null);
  const accountRef = useRef(null);
  useEffect(()=>{
  const handleClick = (e)=>{
    if(!(overlayRef.current && !overlayRef.current.contains(e.target))){
      setGuideShow(false)
    }
  };
  document.addEventListener('pointerdown', handleClick)
  return ()=>{
    document.removeEventListener('pointerdown', handleClick)
  };
},[overlayRef]);
  useEffect(()=>{
  const handleClick = (e)=>{
    if(!(overlayRef.current && !overlayRef.current.contains(e.target))){
      setAccountShow(false)
    }
  };
  document.addEventListener('pointerdown', handleClick)
  return ()=>{
    document.removeEventListener('pointerdown', handleClick)
  };
},[overlayRef]);

  useEffect(()=>{
  const handleClick = (e)=>{
    if(!(overlayRef.current && !overlayRef.current.contains(e.target))){
      setLoginShow(false)
    }
  };
  document.addEventListener('click', handleClick)
  return ()=>{
    document.removeEventListener('click', handleClick)
  };
},[overlayRef]);
  return (
    <>
      {(guideShow || loginShow || accountShow) && <div className="modalOverlay" ref={overlayRef} />}
      <header className="site-header">
        <div className="header-left" onClick={()=>setGuideShow(!guideShow)}>
          <a>Guidelines</a>
        </div>

        <div className="header-right" onClick={()=>setLoginShow(!loginShow)}>
          <a>Login</a>
        </div>
      </header>

      <div className="containerForImageAndButton">
        <button className="create-account" onClick={()=>setAccountShow(!accountShow)}>Create Account</button>
        <main className="main-content" >
        </main>
      </div>

      <CreateAccount show={accountShow} setShow={setAccountShow}/>
      <Guidelines show={guideShow} setShow={setGuideShow}/>
      <Login show={loginShow} setShow={setLoginShow}/>
      <Webfooter />
      <VerifyEmail />
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </>
  )
}

export default App
