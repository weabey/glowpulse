import { Search, ChevronDown } from 'lucide-react';
import { categories } from '../../constants/seedData';

export default function SearchBar({ query, category, onQueryChange, onCategoryChange, onSearch, variant = 'default' }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.();
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${
        isHero
          ? 'bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20'
          : 'bg-white p-2 rounded-2xl shadow-card border border-gray-100'
      }`}
    >
      <div className="relative flex-1">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isHero ? 'text-white/50' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search salons, tattoo artists, piercings..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 ${
            isHero
              ? 'bg-white/10 text-white placeholder:text-white/50 border border-white/10 focus:bg-white/20 focus:border-white/30 focus:outline-none'
              : 'bg-gray-50/80 border border-transparent focus:bg-white focus:border-gray-200 focus:outline-none'
          }`}
        />
      </div>

      <div className="relative">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={`appearance-none w-full sm:w-44 pl-4 pr-10 py-3.5 rounded-xl text-sm cursor-pointer transition-all duration-200 ${
            isHero
              ? 'bg-white/10 text-white border border-white/10 focus:bg-white/20 focus:border-white/30 focus:outline-none'
              : 'bg-gray-50/80 border border-transparent focus:bg-white focus:border-gray-200 focus:outline-none text-gray-700'
          }`}
        >
          <option value="" className="text-gray-700">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="text-gray-700">{cat}</option>
          ))}
        </select>
        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isHero ? 'text-white/50' : 'text-gray-400'}`} />
      </div>

      <button
        type="submit"
        className="btn-primary px-7 py-3.5 text-sm flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4" />
        <span>Search</span>
      </button>
    </form>
  );
}
