import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../context/TransactionContext';

const categories = [
  { name: 'Shopping', icon: 'shopping_bag', color: 'text-error' },
  { name: 'Food & Drinks', icon: 'restaurant', color: 'text-error' },
  { name: 'Transport', icon: 'directions_car', color: 'text-error' },
  { name: 'Health', icon: 'favorite', color: 'text-error' },
  { name: 'Entertainment', icon: 'theaters', color: 'text-error' },
];

const AddTransaction = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();
  
  const [step, setStep] = useState('input'); // 'input' | 'preview'
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorInput, setErrorInput] = useState('');

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].name);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleContinue = () => {
    setErrorInput('');
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setErrorInput("Please enter a valid positive amount.");
      return;
    }
    setStep('preview');
  };

  const handleConfirmSave = () => {
    let color = 'text-error';
    let icon = 'shopping_bag';
    
    const finalCategory = type === 'income' ? 'Income' : category;

    if (type === 'income') {
      color = 'text-tertiary';
      icon = 'account_balance_wallet';
    } else {
      const selectedCat = categories.find(c => c.name === category);
      if (selectedCat) {
        icon = selectedCat.icon;
        color = selectedCat.color;
      }
    }

    addTransaction({
      type,
      amount: Number(amount),
      category: finalCategory,
      date,
      notes: notes || finalCategory,
      icon,
      color
    });

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/'); // Go back to dashboard after saving
    }, 1500);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-fY62rSSNorDXD8xKSP4c0mFYPECkmR7txGqs0K7c98Nt5_kBROTCH68YKxE_liuxfWjIqkylwpeW1mFpR3dzyoXjxYKfYgEz4ejy6zFNW3VHe3bL3nsod2Q3eOcIfoJVDRul3CKw7UqSmAfamDutpPPzOZqXKMasfZylxCjNwcgC1h6sSoXmZCzTA2cVOydyjaQYXIMQW2-yqPQDB4MyyVKyjMB2PhwtbcCmMVF0Dek0MSgbpvobuDGfYIE2ff50oqvVywr-NGs"/>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
               {step === 'preview' ? 'Confirm Details' : 'Add Transaction'}
            </h1>
          </div>
        </div>
      </header>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-tertiary-container text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all animate-bounce">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-semibold whitespace-nowrap text-sm tracking-wide">Transaction Saved!</span>
        </div>
      )}

      <main className="w-full max-w-xl px-6 pt-24 pb-32 flex-grow mx-auto">
        {step === 'input' ? (
          // Input Step
          <>
            <div className="flex p-1 bg-surface-container-low rounded-full mb-8">
              <button 
                onClick={() => setType('expense')}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${type === 'expense' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-slate-500 hover:text-on-surface'}`}
              >
                Expense
              </button>
              <button 
                onClick={() => setType('income')}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${type === 'income' ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-slate-500 hover:text-on-surface'}`}
              >
                Income
              </button>
            </div>

            <section className="mb-10 text-center">
              <p className="text-xs font-label uppercase tracking-wider text-slate-400 mb-2">Total Amount</p>
              <div className="relative inline-flex items-baseline w-full justify-center">
                <span className={`text-2xl font-bold mr-1 ${type === 'income' ? 'text-tertiary' : 'text-primary'}`}>$</span>
                <input 
                  className={`display-font text-5xl md:text-6xl font-bold tracking-tighter bg-transparent border-none text-center focus:ring-0 w-[60%] p-0 placeholder:text-slate-200 ${errorInput ? 'text-error' : 'text-on-surface'}`}
                  placeholder="0.00" 
                  step="0.01" 
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (errorInput) setErrorInput('');
                  }}
                />
              </div>
              {errorInput && <p className="text-error text-xs font-semibold mt-2">{errorInput}</p>}
            </section>

            <div className="space-y-6">
              {type === 'expense' && (
                <div>
                  <label className="block text-xs font-label uppercase tracking-wider text-slate-500 mb-4 ml-1">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button 
                        key={cat.name}
                        onClick={() => setCategory(cat.name)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-transform active:scale-95 ${category === cat.name ? 'bg-primary text-white' : 'bg-surface-container-low text-slate-600 hover:bg-surface-container-highest'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="block text-xs font-label uppercase tracking-wider text-slate-500 mb-2 ml-1">Date</label>
                <div className="flex items-center bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                  <span className="material-symbols-outlined text-slate-400 mr-3">calendar_today</span>
                  <input 
                    className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-medium p-0" 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-xs font-label uppercase tracking-wider text-slate-500 mb-2 ml-1">Notes (Optional)</label>
                <div className="flex items-start bg-surface-container-lowest p-4 rounded-xl shadow-sm">
                  <span className="material-symbols-outlined text-slate-400 mr-3 mt-0.5">notes</span>
                  <textarea 
                    className="bg-transparent border-none focus:ring-0 text-on-surface w-full resize-none font-normal p-0" 
                    placeholder="What was this for?" 
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleContinue}
                  className="w-full py-5 bg-primary text-white rounded-full font-headline text-lg font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Continue
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          // Preview Step
          <div className="space-y-8 animate-fade-in">
            <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-center text-slate-800 mb-2">Transaction Summary</h2>
              
              <div className="flex justify-between items-center border-b border-surface-variant pb-3">
                <span className="text-slate-500 text-sm font-medium">Type</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${type === 'expense' ? 'bg-error/10 text-error' : 'bg-tertiary/10 text-tertiary'}`}>
                  {type}
                </span>
              </div>
              
              <div className="flex justify-between items-center border-b border-surface-variant pb-3">
                <span className="text-slate-500 text-sm font-medium">Amount</span>
                <span className={`text-xl font-bold ${type === 'expense' ? 'text-error' : 'text-tertiary'}`}>
                  ${Number(amount).toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center border-b border-surface-variant pb-3">
                <span className="text-slate-500 text-sm font-medium">Category</span>
                <span className="font-semibold text-slate-800">
                  {type === 'expense' ? category : 'Income'}
                </span>
              </div>
              
              <div className="flex justify-between items-center border-b border-surface-variant pb-3">
                <span className="text-slate-500 text-sm font-medium">Date</span>
                <span className="font-semibold text-slate-800">
                  {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              
              {notes && (
                <div className="flex flex-col gap-1 pt-1">
                  <span className="text-slate-500 text-sm font-medium">Notes</span>
                  <span className="font-medium text-slate-800 italic">"{notes}"</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleConfirmSave}
                disabled={showSuccess}
                className="w-full py-5 bg-primary text-white rounded-full font-headline text-lg font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {showSuccess ? 'Saving...' : 'Confirm & Save'}
              </button>
              <button 
                onClick={() => setStep('input')}
                disabled={showSuccess}
                className="w-full py-4 text-slate-500 font-headline font-bold hover:text-slate-800 transition-colors disabled:opacity-50"
              >
                Back to Edit
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default AddTransaction;
