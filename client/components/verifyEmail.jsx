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
    const [success, setSuccess] = useState(false);

    // Handle input change
    const handleChange = (e, idx) => {
        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
        const newCode = [...code];
        newCode[idx] = val;
        setCode(newCode);

        // Move to next input if value entered
        if (val && idx < 5) {
            inputRefs.current[idx + 1].focus();
        }
        // Move to previous input if deleted
        if (!val && idx > 0) {
            inputRefs.current[idx - 1].focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (paste.length === 6) {
            setCode(paste.split(''));
            inputRefs.current[5].focus();
        }
    };

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
            setSuccess(true);
            toast.success("Email verified successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed.");
        } finally {
            setCode(['', '', '', '', '', ''])
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border border-amber-200">
            <h1 className="text-2xl font-bold text-emerald-700 mb-4 text-center">Verify Your Email</h1>
            <p className="mb-6 text-gray-700 text-center text-sm">
                Please enter the 6-digit code sent to your email.
            </p>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <div className="flex gap-2 justify-center mb-2" onPaste={handlePaste}>
                    {code.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, idx)}
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
                {success && (
                    <div className="text-green-600 text-center mt-2">
                        Email verified! You may now continue.
                    </div>
                )}
            </form>
        </div>
    );
};

export default VerifyEmail