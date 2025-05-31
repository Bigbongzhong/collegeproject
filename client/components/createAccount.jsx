function CreateAccount(props){
    return (
        <div className={props.show ? "createContainer createContainerShow ": "createContainer"}>
            <h1 className="pb-3">Create An Account</h1>
            <form action="" method="GET">
                <label  htmlFor="createName">Name : </label><br />
                <input type="text" id="createName" name="name" placeholder="only@you.com" /><br />
                
                <label htmlFor="createEmail">Email ID : </label><br />
                <input type="text" id="createEmail" name="email" placeholder="only@you.com" /><br />

                <label htmlFor="createPassword">Password : </label><br />
                <input type="password" name="password" id="createPassword"/><br />

                <button>Login</button>
            </form>
        </div>
    )
}
export default CreateAccount