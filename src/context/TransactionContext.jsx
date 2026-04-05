import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultTransactions = [
  { id: '1', type: 'expense', amount: 12.50, category: 'Food & Drinks', date: new Date().toISOString().split('T')[0], notes: 'Blue Bottle Coffee', icon: 'restaurant', color: 'text-error' },
  { id: '2', type: 'expense', amount: 199.00, category: 'Shopping', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], notes: 'Apple Store', icon: 'shopping_bag', color: 'text-error' },
  { id: '3', type: 'income', amount: 4200.00, category: 'Income', date: new Date(Date.now() - 172800000).toISOString().split('T')[0], notes: 'Salary Deposit', icon: 'account_balance_wallet', color: 'text-tertiary' },
];

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('lumina-transactions');
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultTransactions;
  });

  useEffect(() => {
    localStorage.setItem('lumina-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([{ id: Date.now().toString(), ...transaction }, ...transactions]);
  };

  const getBalance = () => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    return income - expense;
  };

  const getIncome = () => transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const getExpense = () => transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, getBalance, getIncome, getExpense }}>
      {children}
    </TransactionContext.Provider>
  );
};
