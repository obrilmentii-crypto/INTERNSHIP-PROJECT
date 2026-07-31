import React from 'react';
export default function CartModal({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300" onClick={onClose} />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md transform bg-white p-6 shadow-2xl flex flex-col h-full transition-transform duration-300">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span></span> Your Basket ({cartItems.length})
            </h2>
            <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 text-xl font-bold">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
                <span className="text-4xl"></span>
                <p className="mt-2 text-sm">Your basket is looking light.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4 items-center border-b pb-4 border-gray-100">
                  <img src={item.product.image} alt={item.product.title} className="h-16 w-16 object-contain bg-gray-50 p-1.5 rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-800 truncate" title={item.product.title}>{item.product.title}</h4>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 border rounded-xl px-2 py-1 bg-gray-50">
                    <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="text-xs font-black text-gray-500 hover:text-red-600 px-1">-</button>
                    <span className="text-xs font-bold w-4 text-center text-gray-800">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="text-xs font-black text-gray-500 hover:text-green-600 px-1">+</button>
                  </div>
                  <button onClick={() => onRemoveItem(item.product.id)} className="text-gray-300 hover:text-red-500 text-sm font-medium px-1" title="Remove Item"></button>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 bg-white">
            <div className="flex justify-between text-base font-black text-gray-900 mb-4">
              <span>Estimated Subtotal:</span>
              <span className="text-xl text-blue-600">${subtotal.toFixed(2)}</span>
            </div>
            <button 
              disabled={cartItems.length === 0}
              onClick={() => alert(`Order simulated successfully! Transacting $${subtotal.toFixed(2)}.`)}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Secure Checkout Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
