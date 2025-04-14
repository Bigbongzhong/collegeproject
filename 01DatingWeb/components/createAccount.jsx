export default function Login(props){
    return (
        <div className={props.show ? "createContainer createContainerShow ": "createContainer"+"h-1/2 max-w-5/3 p-4 absolute z-30"}>
            <form action="" method="GET">
                <label  htmlFor="name">Name : </label><br />
                <input className="pb-2" type="text" name="name" id="name" placeholder="only@you.com" /><br />
                
                <label htmlFor="">Email ID : </label><br />
                <input type="text" className="pb-2" name="email" id="email" placeholder="only@you.com" /><br />

                <label htmlFor="">Password : </label><br />
                <input type="password" className="pb-2" name="password" id="password"/><br />

                <button id="formButton">Login</button>
            </form>
        </div>
    )
}