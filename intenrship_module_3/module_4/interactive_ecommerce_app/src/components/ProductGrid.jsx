import React from 'react';
import ProductCard from './ProductCard';
export default function ProductGrid({ loading, error, products, onRetry, onProductClick, onAddToCart }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-sm font-medium text-gray-500 animate-pulse">Syncing store items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <span className="text-3xl">!</span>
        <h3 className="mt-2 text-lg font-semibold text-red-800">Connection Error</h3>
        <p className="mt-1 text-sm text-red-600">{error}</p>
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center rounded-2xl border border-dashed border-gray-200 bg-white p-8">
        <span className="text-4xl"></span>
        <h3 className="mt-3 text-lg font-bold text-gray-700">No Products Found</h3>
        <p className="mt-1 text-sm text-gray-400">Refine your keywords or reset active navigation categories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
