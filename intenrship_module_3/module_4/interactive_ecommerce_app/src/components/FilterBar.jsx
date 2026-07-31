import React from 'react';
export default function FilterBar({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"></span>
        <input
          type="text"
          placeholder="Search products by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition focus:border-blue-500 capitalize"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium outline-none transition focus:border-blue-500"
        >
          <option value="">Sort by Price</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
