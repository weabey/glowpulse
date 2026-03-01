import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { categories, locations } from '../../constants/seedData';

export default function FilterSidebar({ filters, onChange, onReset, resultCount }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const update = (key, value) => onChange({ ...filters, [key]: value });

  const hasActiveFilters = filters.category || filters.location || filters.minPrice || filters.maxPrice;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100/80 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-900">Filters</h3>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {resultCount} result{resultCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => update('category', e.target.value)}
            className="input-modern"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <select
            value={filters.location}
            onChange={(e) => update('location', e.target.value)}
            className="input-modern"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => update('minPrice', e.target.value)}
              className="input-modern"
            />
            <span className="text-gray-300 font-light text-lg">/</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => update('maxPrice', e.target.value)}
              className="input-modern"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
          <select
            value={filters.sort}
            onChange={(e) => update('sort', e.target.value)}
            className="input-modern"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="px-5 pb-5">
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2.5">Active</p>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-inset ring-indigo-600/10">
                  {filters.category}
                  <X className="w-3 h-3 cursor-pointer hover:text-indigo-900 transition-colors" onClick={() => update('category', '')} />
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-inset ring-indigo-600/10">
                  {filters.location}
                  <X className="w-3 h-3 cursor-pointer hover:text-indigo-900 transition-colors" onClick={() => update('location', '')} />
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full ring-1 ring-inset ring-indigo-600/10">
                  Rs. {filters.minPrice || '0'} - Rs. {filters.maxPrice || '...'}
                  <X className="w-3 h-3 cursor-pointer hover:text-indigo-900 transition-colors" onClick={() => onChange({ ...filters, minPrice: '', maxPrice: '' })} />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
