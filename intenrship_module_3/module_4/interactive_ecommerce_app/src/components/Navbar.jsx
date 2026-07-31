import React from 'react';
export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-100 px-6 py-4 shadow-xs">
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl"></span>
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            StoreExplorer
          </h1>
        </div>
        <button 
          onClick={onCartOpen} 
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-sm transition active:scale-98"
        >
          <span>View Cart</span>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  );
}
