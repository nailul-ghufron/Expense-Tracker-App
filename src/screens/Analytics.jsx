import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const Analytics = () => {
  const { getExpense, transactions } = useTransactions();
  const totalExpense = getExpense();
  
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  let categoryData = [];
  
  if (expenseTransactions.length > 0) {
    const categoriesSet = Array.from(new Set(expenseTransactions.map(t => t.category)));
    categoryData = categoriesSet.map(cat => {
      const value = expenseTransactions.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0);
      const icon = expenseTransactions.find(t => t.category === cat)?.icon || 'category';
      return { name: cat, value, icon };
    }).sort((a,b) => b.value - a.value);
  }

  const COLORS = ['bg-primary-fixed-dim text-primary', 'bg-primary text-on-primary', 'bg-secondary-fixed-dim text-secondary', 'bg-tertiary-fixed-dim text-tertiary', 'bg-primary-container text-on-primary-container', 'bg-outline-variant text-on-surface'];
  const BG_COLORS = ['bg-primary-fixed-dim', 'bg-primary', 'bg-secondary-fixed-dim', 'bg-tertiary-fixed-dim', 'bg-primary-container', 'bg-outline-variant'];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high">
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXgnbQzSBjZ6FuY5sYDVVlRznvmNZJs1ghjY7gQJaq3PUqMi6ZYpgqZY1ymcE4nyLE1WWK3pRxdOn1VeACJr10BEi9bknzhoJ4QCmKGiXkg_iQ3g7I734WPMAzfuXtoluTI4GkUzBAoXZN6QjsWVkQOA1eD4uElC2MoPym7kL5VxTpswke8vxHgM0h_gtXrLhO97BB7hqHUroiBNTD0-5lQmMm1gV6B8SeEgLYxttGneAK9brbuMD_xS_IE8IBfdsvoFhxJ8smBeY"/>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 font-headline">Analytics</h1>
          </div>
          <button className="text-slate-500 hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>
      
      <main className="pt-24 px-6 max-w-xl mx-auto space-y-8 pb-32">
        <section>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm whitespace-nowrap hover:opacity-80 transition-opacity">Daily</button>
            <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm whitespace-nowrap hover:opacity-80 transition-opacity">Weekly</button>
            <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm whitespace-nowrap shadow-lg shadow-primary/10">Monthly</button>
            <button className="px-6 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-medium text-sm whitespace-nowrap hover:opacity-80 transition-opacity">Yearly</button>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-1">Total Spending</p>
              <p className="text-3xl font-headline font-bold tracking-tight text-primary">${totalExpense.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-1 text-error text-sm font-medium mb-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>12.5%</span>
            </div>
          </div>

          <div className="flex items-end justify-around h-48 pt-4 gap-2">
            {categoryData.slice(0, 6).map((cat, idx) => {
              const heightPercentage = totalExpense > 0 ? (cat.value / categoryData[0].value) * 100 : 0;
              return (
                <div key={cat.name} className="flex flex-col items-center gap-3 w-full">
                  <div className={`w-8 ${BG_COLORS[idx % BG_COLORS.length]} rounded-t-full transition-all duration-500`} style={{ height: `${Math.max(15, heightPercentage * 0.85)}%` }}></div>
                  <span className="text-[10px] font-label text-on-surface-variant uppercase">{cat.name.substring(0,3)}</span>
                </div>
              );
            })}
            {categoryData.length === 0 && <div className="text-slate-500 self-center">No expense data</div>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-headline font-semibold text-lg px-2">Category Breakdown</h2>
          <div className="space-y-2">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${COLORS[idx % COLORS.length]}`}>
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-on-surface">{cat.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-on-surface">${cat.value.toFixed(2)}</p>
                  <p className="text-xs text-tertiary font-medium">{((cat.value / totalExpense) * 100).toFixed(0)}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Analytics;
