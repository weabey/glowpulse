import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Scissors, Palette, CircleDot, Armchair, Sparkles as NailIcon, Heart, ShoppingBag, TrendingUp, Shield, Zap } from 'lucide-react';
import { useAds } from '../context/AdsContext';
import SearchBar from '../components/SearchBar';
import AdCard from '../components/AdCard';

const categoryData = [
  { name: 'Hair Salons', icon: Scissors, color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50', text: 'text-pink-600' },
  { name: 'Tattoo Parlors', icon: Palette, color: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', text: 'text-violet-600' },
  { name: 'Piercing Studios', icon: CircleDot, color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50', text: 'text-cyan-600' },
  { name: 'Barbershops', icon: Armchair, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', text: 'text-blue-600' },
  { name: 'Nail Salons', icon: NailIcon, color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', text: 'text-rose-600' },
  { name: 'Spa & Wellness', icon: Heart, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { name: 'Beauty Supply', icon: ShoppingBag, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', text: 'text-amber-600' },
];

const stats = [
  { label: 'Active Listings', value: '500+' },
  { label: 'Happy Clients', value: '5K+' },
  { label: 'Cities Covered', value: '8+' },
];

export default function Home() {
  const navigate = useNavigate();
  const { ads } = useAds();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const allAds = [...ads].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 text-white">
        {/* Animated background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.03)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-36">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-indigo-200">ආයුබෝවන්! Top-rated salons & studios across Sri Lanka</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Your style,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                your expression
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-200/80 max-w-2xl mx-auto leading-relaxed">
              Discover the best salons, tattoo parlors, and piercing studios across Sri Lanka. Book your next appointment today.
            </p>

            {/* Search bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <SearchBar
                query={query}
                category={category}
                onQueryChange={setQuery}
                onCategoryChange={setCategory}
                onSearch={handleSearch}
                variant="hero"
              />
            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center justify-center gap-8 md:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs md:text-sm text-indigo-300/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80V40C240 0 480 0 720 20C960 40 1200 60 1440 40V80H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="text-gray-500 mt-2">Find salons, studios & artists by specialty</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categoryData.map(({ name, icon: Icon, color, bg, text }) => (
              <Link
                key={name}
                to={`/listings?category=${encodeURIComponent(name)}`}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center group-hover:bg-gradient-to-br group-hover:${color} group-hover:shadow-lg transition-all duration-300`}>
                  <Icon className={`w-6 h-6 ${text} group-hover:text-white transition-colors duration-300`} />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors text-center">
                  {name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Ads */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Listings</h2>
              <p className="text-gray-500 mt-2">Explore salons, studios & artists across Sri Lanka</p>
            </div>
            <Link
              to="/listings"
              className="group flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View with filters
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAds.map((ad, i) => (
              <div key={ad.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <AdCard ad={ad} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why choose Ceylon Beauty?</h2>
            <p className="text-gray-500 mt-2">The best way to find your next salon or studio</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Discover Instantly',
                desc: 'Find top-rated salons, tattoo artists, and piercing studios in seconds.',
                gradient: 'from-amber-400 to-orange-500',
              },
              {
                icon: Shield,
                title: 'Verified & Trusted',
                desc: 'Real reviews from real clients. Only verified professionals listed.',
                gradient: 'from-emerald-400 to-teal-500',
              },
              {
                icon: TrendingUp,
                title: 'Growing Network',
                desc: 'Beauty professionals across Sri Lanka, from Colombo to Jaffna and growing.',
                gradient: 'from-indigo-400 to-purple-500',
              },
            ].map(({ icon: Icon, title, desc, gradient }) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-5`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-10 md:p-16 text-center">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Own a salon or studio?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                List your business and reach thousands of clients across Sri Lanka. Posting is quick, easy, and free.
              </p>
              <Link
                to="/post"
                className="inline-flex items-center gap-2 mt-8 bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                List Your Business
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
