import React from 'react';

const Header = ({ onLogout, darkMode, setDarkMode }) => (
    <header className={`flex justify-between items-center py-6 px-8 shadow-lg rounded-b-2xl mb-8 transition-colors ${darkMode ? 'bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-800 text-white' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white'}`}>
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow">Expense Tracker</h1>
        <div className="flex gap-3 items-center">
            <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white font-semibold shadow transition"
            >
                Logout
            </button>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow transition border border-white/20 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/40 text-white'}`}
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.418-9.09a.75.75 0 01.908.325.75.75 0 01-.062.954A7.501 7.501 0 0012 19.5c2.485 0 4.712-1.21 6.156-3.09a.75.75 0 01.954-.062.75.75 0 01.325.908z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                    </svg>
                )}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    </header>
);

export default Header;
