import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import BottomNavBar from './components/BottomNavBar';
import Dashboard from './screens/Dashboard';
import AddTransaction from './screens/AddTransaction';
import History from './screens/History';
import Analytics from './screens/Analytics';

function App() {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        <BottomNavBar />
      </Router>
    </TransactionProvider>
  );
}

export default App;
