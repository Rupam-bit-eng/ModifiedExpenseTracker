import React from 'react';

const ExpenseForm = ({ newExpense, onInputChange, onSubmit, editingId }) => (
    <form
        className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mt-8 border border-gray-200 dark:border-gray-700 transition-colors"
        onSubmit={e => {
            e.preventDefault();
            const payload = { ...newExpense, date: newExpense.date || new Date().toISOString().slice(0, 10) };
            onSubmit(payload);
        }}
    >
        <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={onInputChange}
            placeholder="Description"
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
        />
        <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={onInputChange}
            placeholder="Amount"
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
        />
        <input
            type="date"
            name="date"
            value={newExpense.date || ''}
            onChange={onInputChange}
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg shadow font-semibold tracking-wide transition"
        >
            {editingId ? 'Update Expense' : 'Add Expense'}
        </button>
    </form>
);

export default ExpenseForm;
