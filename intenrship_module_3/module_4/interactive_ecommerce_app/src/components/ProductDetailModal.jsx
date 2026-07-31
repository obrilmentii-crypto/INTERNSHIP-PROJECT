import React from 'react';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl transform rounded-3xl bg-white p-6 md:p-8 shadow-2xl transition-all max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-6">
        <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 text-sm font-bold">✕</button>
        
        <div className="flex flex-shrink-0 items-center justify-center rounded-2xl bg-gray-50 p-4 w-full md:w-1/2 h-64 md:h-auto">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full capitalize">{product.category}</span>
            <h2 className="mt-3 text-lg font-bold text-gray-900 leading-snug">{product.title}</h2>
            
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-amber-500 font-bold text-sm"> {product.rating?.rate}</span>
              <span className="text-xs text-gray-400">Based on {product.rating?.count} structural evaluations</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600 border-t pt-4 border-gray-100">{product.description}</p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-tight">Price</p>
              <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              Add To Basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
