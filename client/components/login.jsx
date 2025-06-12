import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

function Login(props) {
    const [email, setEmail] = useState("hello@gmail.com")
    const [password, setPassword] = useState("12345")
    const [error, setError] = useState("");

    const login = async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            console.log(response.data.message);
        } catch (error) {
            setError(error.response.data.message);
            throw error;
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login();
            props.setShow(prev => !prev);
            toast.success("Login Successful");
        } catch (error) {
            console.log(error.message)
        }
    }
    
    return (
        <div className={props.show ? "loginContainer loginContainerShow" : "loginContainer"}>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg/15 overflow-hidden p-8 mt-8 border border-gray-200">
                <h1 className="text-2xl font-bold text-emerald-700 text-center mb-6">Log in</h1>
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="loginEmail" className="block mb-1 text-gray-700 font-medium">Email ID</label>
                        <input
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            type="text"
                            name="email"
                            id="loginEmail"
                            placeholder="only@you.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="loginPassword" className="block mb-1 text-gray-700 font-medium">Password</label>
                        <input
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="loginPassword"
                            placeholder="Your Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                    {error && <p className='text-red-500 font-medium mt-2'>{error}</p>}
                    <button
                        type="submit"
                        className="mt-4 bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="#" className="text-emerald-600 hover:underline text-sm">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}
export default Login