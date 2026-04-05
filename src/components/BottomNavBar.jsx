import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-t-[3rem] z-50 shadow-[0px_-12px_32px_rgba(25,28,29,0.06)]">
      <div className="flex justify-around items-center px-4 pb-6 pt-2 h-24 max-w-xl mx-auto">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `flex flex-col items-center justify-center p-3 transition-all duration-300 ease-out active:scale-90 ` +
            (isActive ? "text-blue-600" : "text-slate-400 hover:text-blue-600")
          }
        >
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>dashboard</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">Dashboard</span>
            </>
          )}
        </NavLink>
        
        <NavLink 
          to="/history" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center p-3 transition-all duration-300 ease-out active:scale-90 ` +
            (isActive ? "text-blue-600" : "text-slate-400 hover:text-blue-600")
          }
        >
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>history_toggle_off</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">History</span>
            </>
          )}
        </NavLink>
        
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center p-3 transition-all duration-300 ease-out active:scale-90 ` +
            (isActive ? "text-blue-600" : "text-slate-400 hover:text-blue-600")
          }
        >
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>insert_chart</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">Analytics</span>
            </>
          )}
        </NavLink>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-[110px] left-0 w-full z-[60] pointer-events-none flex justify-center">
        <div className="w-full max-w-xl px-6 flex justify-end">
          <NavLink 
            to="/add" 
            className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          >
            <span className="material-symbols-outlined text-[32px]">add</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavBar;
