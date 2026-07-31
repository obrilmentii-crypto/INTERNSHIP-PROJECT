import React, { useEffect, useState } from 'react';
export default function ProductCard({Product,Oncliclk,onAddToCart}) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white p-4 shadow-xs border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-200">
      <div 
        onClick={onClick} 
        className="mb-4 flex h-44 w-full cursor-pointer items-center justify-center bg-slate-50/70 rounded-xl p-4 transition group-hover:opacity-90"
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-102" 
        />
      </div>
      <div className="flex-1 cursor-pointer" onClick={onClick}>
        <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 rounded-full capitalize">
          {product.category}
        </span>
        <h3 className="mt-2 text-sm font-semibold text-slate-800 line-clamp-2 transition group-hover:text-blue-600" title={product.title}>
          {product.title}
        </h3>
        <p className="mt-2 flex items-center gap-1 text-xs text-amber-500 font-bold">
           ★{product.rating.rate} <span className="text-slate-400 font-normal">({product.rating.count} reviews)</span>
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50">
        <span className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} 
          className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition active:scale-95"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
