function Login(props){
    return (
        <div className="">
            <div className={props.show ? "loginContainer loginContainerShow ": "loginContainer"} >
                <h1>Log in</h1>
                <br />
                <form action="" method="GET">
                    <label htmlFor="">Email ID</label><br />
                    <input type="text" name="email" id="email" placeholder="only@you.com" /><br />
                    <label htmlFor="">Password</label><br />
                    <input type="password" name="password" id="passWord"/><br />
                    <input type="checkbox" id="keepLoggedIn" />
                    <button id="formButton">Login</button><br />
                </form>
                
            </div>
        </div>
    )
}
export default Login