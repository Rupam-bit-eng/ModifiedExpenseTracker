import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalExpenses from './components/TotalExpenses';
import ExpenseAnalysis from './ExpenseAnalysis';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [total, setTotal] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    const calculatedTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotal(calculatedTotal);
  }, [expenses]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/expenses', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setExpenses(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setToken(null);
        localStorage.removeItem('token');
      } else {
        console.error('Error fetching expenses:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddOrUpdate = async () => {
    const method = editingId ? 'put' : 'post';
    const url = editingId ? `http://localhost:8082/api/expenses/${editingId}` : 'http://localhost:8082/api/expenses';
    const payload = { ...newExpense, amount: parseFloat(newExpense.amount), date: newExpense.date || new Date().toISOString().slice(0, 10) };

    try {
      await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: payload,
      });
      fetchExpenses();
      setNewExpense({ description: '', amount: '', date: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error adding/updating expense:', error);
    }
  };

  const handleEdit = (expense) => {
    setNewExpense({ description: expense.description, amount: expense.amount, date: expense.date });
    setEditingId(expense.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/expenses/${id}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setExpenses([]);
    setTotal(0);
  };

  if (!token) {
    if (showRegister) {
      return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
    } else {
      return <LoginPage setToken={setToken} onSwitchToRegister={() => setShowRegister(true)} />;
    }
  }

  return (
    <div className={`min-h-screen ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900'
        : 'bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200'
    } transition-colors`}>
      <Header onLogout={handleLogout} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-3xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition mr-2"
            onClick={() => setShowAnalysis(!showAnalysis)}
          >
            {showAnalysis ? 'Back to Expenses' : 'Show Expense Analysis'}
          </button>
        </div>
        {showAnalysis ? (
          <ExpenseAnalysis expenses={expenses} />
        ) : (
          <>
            <ExpenseForm
              newExpense={newExpense}
              onInputChange={handleInputChange}
              onSubmit={handleAddOrUpdate}
              editingId={editingId}
            />
            <ExpenseList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <TotalExpenses total={total} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
