import React from 'react';
import ExpenseTableRow from './ExpenseTableRow';

const ExpenseList = ({ expenses, onEdit, onDelete }) => (
    <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white dark:bg-gray-900   border dark:border-gray-700 ">
            <thead>
                <tr className="bg-indigo-100 dark:bg-gray-800">
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Description</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Amount ($)</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <ExpenseTableRow key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    </div>
);

export default ExpenseList;
