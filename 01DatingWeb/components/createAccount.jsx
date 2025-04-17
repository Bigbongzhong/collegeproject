function CreateAccount(props){
    return (
        <div className={props.show ? "createContainer createContainerShow ": "createContainer"}>
            <form action="" method="GET">
                <label  htmlFor="createName">Name : </label><br />
                <input className="pb-2" type="text" id="createName" name="name" placeholder="only@you.com" /><br />
                
                <label htmlFor="createEmail">Email ID : </label><br />
                <input type="text" className="pb-2" id="createEmail" name="email" placeholder="only@you.com" /><br />

                <label htmlFor="createPassword">Password : </label><br />
                <input type="password" className="pb-2" name="password" id="createPassword"/><br />

                <button>Login</button>
            </form>
        </div>
    )
}
export default CreateAccount