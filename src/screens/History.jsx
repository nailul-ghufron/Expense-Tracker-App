import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

const History = () => {
  const { transactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Food & Drinks', 'Shopping', 'Income', 'Transport', 'Health', 'Entertainment'];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.notes.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || t.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Group by date
  const grouped = filteredTransactions.reduce((acc, t) => {
    if (!acc[t.date]) acc[t.date] = [];
    acc[t.date].push(t);
    return acc;
  }, {});

  const dates = Object.keys(grouped).sort((a,b) => new Date(b) - new Date(a));

  const getDateLabel = (dateStr) => {
    const d = parseISO(dateStr);
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return format(d, 'MMMM d, yyyy');
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest">
              <img alt="User profile photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMgCj_-5Anu53WuC5Dp3J3r72TsV2VnDwCIE2M-LS11SiZjf0AuV3vqt5YIBkE4exkh14G-W41irIuAzIhERWH3uQFoRD0AGUxgpjBTE6S8H_B8fi6HckXnlOAm3nQZWMheUPTJGMxQC5-jwbocPRuaEulc48V2lKhxFQ1-lgRiz3vPx6gkGqmx9icZqlxvXAu9jOm1bf5GObsw2sX1FLXLKeKdbJdbNwWuIEGMQya4iqiDNnAfpwJmVhvKcB4_q7mOfg3-aYSwwo"/>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">History</span>
          </div>
          <button className="text-blue-700 dark:text-blue-400 hover:opacity-80 transition-opacity active:scale-95 duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="pt-20 pb-32 px-6 max-w-xl mx-auto">
        <section className="mb-8 flex gap-3">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
            <input 
              className="w-full bg-surface-container-highest border-none rounded-full py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400" 
              placeholder="Search transactions..." 
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="aspect-square w-12 flex items-center justify-center bg-surface-container-highest rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </section>

        <section className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors ${filter === f ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {f}
            </button>
          ))}
        </section>

        <div className="space-y-10">
          {dates.map(date => (
            <div key={date}>
              <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-slate-400 mb-4 ml-2">{getDateLabel(date)}</h3>
              <div className="space-y-4">
                {grouped[date].map(transaction => (
                  <div key={transaction.id} className="group flex items-center justify-between p-1 rounded-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${transaction.color}`}>
                        <span className="material-symbols-outlined text-2xl">{transaction.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{transaction.notes}</p>
                        <p className="text-xs text-slate-500">{transaction.category}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-bold ${transaction.type === 'expense' ? 'text-error' : 'text-tertiary'}`}>
                      {transaction.type === 'expense' ? '-' : '+'}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {dates.length === 0 && (
            <div className="text-center text-slate-500 py-10">No transactions found</div>
          )}
        </div>
      </main>
    </>
  );
};

export default History;
