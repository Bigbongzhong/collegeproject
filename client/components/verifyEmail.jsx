import React from 'react'
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

const VerifyEmail = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (value, index) => {
        const newCode = [...code];

        //Handle pasted content
        if(value.length > 1){
            const pastedCode = value.slice(0,6).split('');
            for(let i = 0; i<6 ; i++)
                newCode[i] = pastedCode[i] || '';
            setCode(newCode);

            //Focus on the last non-empty input or first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[lastFilledIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            //Move focus to next input field
            if(value && index <5 ){
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && !code[index] && index > 0){
            inputRefs.current[index - 1].focus();
        }
    }

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const codeStr = code.join('');
            if (codeStr.length !== 6) {
                setError("Please enter the 6-digit code.");
                setLoading(false);
                return;
            }
            const response = await axios.post(`${API_URL}/verify-email`, { code: codeStr });
            console.log(response.data.message)
            toast.success("Email verified successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed.");
        } finally {
            setCode(['', '', '', '', '', ''])
            setLoading(false);
        }
    };

    useEffect(() => {
        if(code.every((digit) => digit !== '')){
            handleSubmit(new Event("submit"));
        }
    },[code])

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border border-amber-200">
            <h1 className="text-2xl font-bold text-emerald-700 mb-4 text-center">Verify Your Email</h1>
            <p className="mb-6 text-gray-700 text-center text-sm">
                Please enter the 6-digit code sent to your email.
            </p>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <div className="flex gap-2 justify-between mb-2">
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, idx)}
                            onKeyDown={e => handleKeyDown(idx, e)}
                            ref={el => inputRefs.current[idx] = el}
                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    ))}
                </div>
                {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                <button
                    type="submit"
                    className="bg-emerald-600 text-white font-semibold py-2 px-8 rounded-lg hover:bg-emerald-700 transition"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </form>
        </div>
    );
};

export default VerifyEmail