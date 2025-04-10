function Login(props){
    return (
        <div className="">
            <div className={props.show ? "loginContainer loginContainerShow ": "loginContainer"} >
                <h1>Log in</h1>
                <br />
                <form action="">
                <label htmlFor="">Email ID</label><br />
                <input type="text" id="Email ID" placeholder="abc@xyzmail.com" /><br />
                <label htmlFor="">Password</label><br />
                <input type="password" id="passWord"/><br />
                <input type="checkbox" id="keepLoggedIn" />
                <label htmlFor=""> Keep me logged in </label><br />
                <button id="formButton">Login</button>
                </form>
                
            </div>
        </div>
    )
}
export default Login