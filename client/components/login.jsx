function Login(props){
    return (
        <div className={props.show ? "loginContainer loginContainerShow ": "loginContainer"} >
            <h1>Log in</h1>
            <br />
            <form action="" method="GET">
                <label htmlFor="loginEmail">Email ID</label><br />
                <input type="text" name="email" id="loginEmail" placeholder="only@you.com" /><br />
                <label htmlFor="loginPassword">Password</label><br />
                <input type="password" name="password" id="loginPassword"/><br />
                <button>Login</button><br />
            </form>
            
        </div>
    )
}
export default Login