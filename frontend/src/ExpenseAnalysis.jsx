import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseAnalysis = ({ expenses }) => {
  // Group expenses by description/category
  const grouped = expenses.reduce((acc, expense) => {
    const key = expense.description || 'Other';
    acc[key] = (acc[key] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(grouped),
        backgroundColor: [
  '#ff6f61', // Coral Red
  '#00bcd4', // Cyan
  '#8bc34a', // Light Green
  '#ff9800', // Orange
  '#795548', // Brown
  '#009688', // Teal
  '#e91e63', // Pink
  '#3f51b5', // Indigo
  '#4caf50', // Green
  '#9c27b0', // Purple
  '#ffc107', // Amber
  '#607d8b', // Blue Grey
  '#ffeb3b', // Yellow
  '#673ab7', // Deep Purple
  '#2196f3', // Blue
  '#cddc39', // Lime
  '#f44336', // Red
  '#3e2723', // Dark Brown
  '#1de9b6', // Bright Aqua
  '#ff4081'  // Vivid Pink
],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Expense Analysis</h2>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseAnalysis;
