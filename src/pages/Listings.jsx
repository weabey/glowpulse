import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, SearchX } from 'lucide-react';
import { useAds } from '../context/AdsContext';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import AdCard from '../components/AdCard';

const defaultFilters = {
  category: '',
  location: '',
  minPrice: '',
  maxPrice: '',
  sort: 'newest',
};

export default function Listings() {
  const { ads } = useAds();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: searchParams.get('category') || '',
  });

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('q') || '';
    setQuery(q);
    setFilters((prev) => ({ ...prev, category: cat }));
  }, [searchParams]);

  const filteredAds = useMemo(() => {
    let result = [...ads];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (ad) =>
          ad.title.toLowerCase().includes(q) ||
          ad.description.toLowerCase().includes(q) ||
          ad.category.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((ad) => ad.category === filters.category);
    }
    if (filters.location) {
      result = result.filter((ad) => ad.location === filters.location);
    }
    if (filters.minPrice) {
      result = result.filter((ad) => ad.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((ad) => ad.price <= Number(filters.maxPrice));
    }

    switch (filters.sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [ads, query, filters]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat);
    else params.delete('category');
    setSearchParams(params);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Listings</h1>
              <p className="text-gray-500 mt-1 text-sm">Discover salons, tattoo parlors & piercing studios across Sri Lanka</p>
            </div>
          </div>
          <SearchBar
            query={query}
            category={filters.category}
            onQueryChange={setQuery}
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden flex items-center gap-2 mb-6 px-5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                resultCount={filteredAds.length}
              />
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-gray-50 overflow-y-auto animate-slide-in-right">
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    filters={filters}
                    onChange={setFilters}
                    onReset={resetFilters}
                    resultCount={filteredAds.length}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {filteredAds.length === 0 ? (
              <div className="text-center py-24 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <SearchX className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  We couldn't find any ads matching your criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAds.map((ad, i) => (
                  <div key={ad.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}>
                    <AdCard ad={ad} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
