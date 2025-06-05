import axios from 'axios';
import { useState, useEffect } from 'react';

function Login(props) {
    return (
        <div className={props.show ? "loginContainer loginContainerShow" : "loginContainer"}>
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg/15 overflow-hidden p-8 mt-8 border border-gray-200">
                <h1 className="text-2xl font-bold text-emerald-700 text-center mb-6">Log in</h1>
                <form className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="loginEmail" className="block mb-1 text-gray-700 font-medium">Email ID</label>
                        <input
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
                            type="password"
                            name="password"
                            id="loginPassword"
                            placeholder="Your Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
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