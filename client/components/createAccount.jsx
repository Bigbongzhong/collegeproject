import axios from 'axios';
import { useState, useEffect } from 'react';

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

function CreateAccount(props) {
    const [email, setEmail] = useState("hello@gmail.com");
    const [name , setName] = useState("Hello");
    const [password, setPassword] = useState("12345");
    const [error, setError] = useState("");

    const signUp = async () => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name });
            console.log(response.data)
        } catch (error) {
            setError(error.response.data.message || "Error signing up");
            throw error;
        }
    }
    
    const handleSignup = async (e) => {
		e.preventDefault();
        
        try {
            await signUp();
        } catch (error) {
            console.log(error);
        }

        console.log(email, name, password)
        
        setName('');
        setEmail('');
        setPassword('');
    };
    return (
        <div className={props.show ? "createContainer createContainerShow" : "createContainer"}>
            <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 mt-8 border border-gray-200">
                <h1 className="pb-6 text-center text-2xl font-bold text-emerald-700">Create An Account</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium" htmlFor="createName">Name</label>
                        <input
                            type="text"
                            id="createName"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Your Name"
                            />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium" htmlFor="createEmail">Email ID</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="createEmail"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="only@you.com"
                            />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium" htmlFor="createPassword">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            id="createPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Your Password"
                        />
                    </div>
                    {error && <p className='text-red-500 font-medium mt-2'>{error}</p>}

                    <button
                        type="submit"
                        className="mt-4 bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
export default CreateAccount