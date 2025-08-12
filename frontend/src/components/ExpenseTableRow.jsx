import React from 'react';

const ExpenseTableRow = ({ expense, onEdit, onDelete }) => (
    <tr className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors">
        <td className="px-6 py-3 text-gray-900 dark:text-gray-100">{expense.description}</td>
        <td className="px-6 py-3 text-indigo-700 dark:text-indigo-300 font-semibold">{expense.amount.toFixed(2)}</td>
        <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{expense.date}</td>
        <td className="px-6 py-3 flex gap-2">
            <button onClick={() => onEdit(expense)} className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded-lg text-white font-semibold shadow transition">Edit</button>
            <button onClick={() => onDelete(expense.id)} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-white font-semibold shadow transition">Delete</button>
        </td>
    </tr>
);

export default ExpenseTableRow;
