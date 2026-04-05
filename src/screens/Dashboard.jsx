import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const Dashboard = () => {
  const { transactions, getBalance, getIncome, getExpense } = useTransactions();
  
  const balance = getBalance();
  const income = getIncome();
  const expense = getExpense();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  let categoryData = [];
  
  if (expenseTransactions.length > 0) {
    const categories = Array.from(new Set(expenseTransactions.map(t => t.category)));
    categoryData = categories.map(cat => {
      const value = expenseTransactions.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0);
      return { name: cat, value };
    }).sort((a,b) => b.value - a.value);
  }
  
  const COLORS = ['#0040a1', '#525f73', '#006d3c', '#c3c6d6'];

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-slate-50/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
              <img alt="User profile photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBynDR9ssDncHmUDCgqNnb75GdL5Grlju8-EqeiL7Qf2HYL0dfwggmHocS_tVrpQKbrh8ZLrHyFgEdz9Xg0zyreN1fCjdkgwQkL7qvba7Se9hyksj29E4l7BA9WDTTWTUWStkOiT1hnRBaVsoWmDAgKfxLBI4rYfsML8caAhLPBBpjY7OxZAh3X-VRrk69HRujfzBi8m7HChW0mUlWfW_-6Rt7KxVOKrmb_Ni3oC_ejWUKBnkXAQTXiaronZw_afJM7GXg7pOmHx6s"/>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Lumina Finance</span>
          </div>
          <button className="text-blue-700 hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-[28px]" data-icon="notifications">notifications</span>
          </button>
        </div>
      </header>

      <main className="px-6 max-w-xl mx-auto pb-8">
        <section className="mt-4 mb-8">
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 shadow-xl shadow-blue-500/15 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-on-primary-container/80 font-medium text-sm tracking-wide uppercase">Total Balance</p>
              <h1 className="text-4xl md:text-5xl font-bold text-on-primary tracking-tight mt-2">${balance.toFixed(2)}</h1>
              <div className="mt-6 flex items-center gap-2 text-on-primary-container text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                  +2.4%
                </span>
                <span className="opacity-70">than last month</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-lowest p-5 rounded-3xl flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_downward</span>
              </div>
              <span className="text-label-sm font-semibold uppercase tracking-wider text-slate-500 text-[10px]">Income</span>
            </div>
            <span className="text-xl font-bold text-tertiary">${income.toFixed(2)}</span>
          </div>
          <div className="bg-surface-container-lowest p-5 rounded-3xl flex flex-col gap-1 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
              </div>
              <span className="text-label-sm font-semibold uppercase tracking-wider text-slate-500 text-[10px]">Expenses</span>
            </div>
            <span className="text-xl font-bold text-error">${expense.toFixed(2)}</span>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-headline-sm font-bold text-slate-900">Spending Distribution</h2>
              <span className="material-symbols-outlined text-slate-400">more_horiz</span>
            </div>
            {categoryData.length > 0 ? (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-slate-400 uppercase font-medium">Total</span>
                    <span className="text-lg font-bold">${(expense/1000).toFixed(1)}k</span>
                  </div>
                </div>
                <div className="flex-1 w-full space-y-4">
                  {categoryData.slice(0, 3).map((entry, i) => (
                    <div key={entry.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-slate-600 font-medium">{entry.name}</span>
                      </div>
                      <span className="font-bold">{((entry.value / expense) * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-4">No expense data available</div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-headline-sm font-bold text-slate-900">Recent Transactions</h2>
            <button className="text-sm font-semibold text-primary hover:opacity-70 transition-opacity">View All</button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 3).map(transaction => (
              <div key={transaction.id} className="bg-surface-container-lowest p-4 rounded-3xl flex items-center justify-between transition-transform active:scale-[0.98] shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center ${transaction.color}`}>
                    <span className="material-symbols-outlined">{transaction.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{transaction.notes}</p>
                    <p className="text-xs text-slate-500 font-medium">{transaction.category} • {format(new Date(transaction.date), 'MMM d')}</p>
                  </div>
                </div>
                <span className={`font-bold ${transaction.type === 'expense' ? 'text-error' : 'text-tertiary'}`}>
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center text-slate-500 py-4">No recent transactions</div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
