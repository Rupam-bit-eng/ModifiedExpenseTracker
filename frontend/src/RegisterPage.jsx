import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:8082/api/auth/register', {
                username,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);
            setSuccess('Registration successful! You can now log in.');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message && err.message.includes('Network Error')) {
                setError('Failed to connect to the server. Please ensure the backend is running.');
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-400 dark:from-gray-900 dark:via-indigo-900 dark:to-gray-800 transition-colors p-4">
            <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 dark:border-gray-700">
                <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white drop-shadow-lg tracking-tight">
                    Create an account
                </h2>
                {error && (
                    <div className="bg-red-100 dark:bg-red-900/40 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-4 rounded-lg shadow" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 dark:bg-green-900/40 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 mb-4 rounded-lg shadow" role="alert">
                        <p className="font-bold">Success</p>
                        <p>{success}</p>
                    </div>
                )}
                <form className="space-y-7" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-base font-semibold text-gray-700 dark:text-gray-200 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-8 text-center">
                    <p className="text-base text-gray-700 dark:text-gray-300">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline bg-transparent border-none cursor-pointer transition"
                        >
                            Click to login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
