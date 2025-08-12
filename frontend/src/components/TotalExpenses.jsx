import React from 'react';

const TotalExpenses = ({ total }) => (
    <div className="flex justify-end mt-10">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 dark:from-gray-800 dark:via-indigo-900 dark:to-gray-700 rounded-2xl shadow-lg px-8 py-5 inline-block">
            <h3 className="text-3xl font-extrabold tracking-wide text-white drop-shadow">
                Total: <span className="text-yellow-300">{total.toFixed(2)}</span>
            </h3>
        </div>
    </div>
);

export default TotalExpenses;
