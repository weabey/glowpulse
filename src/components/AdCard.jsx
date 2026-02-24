import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart } from 'lucide-react';

export default function AdCard({ ad }) {
  const formatPrice = (price) => {
    if (price >= 100000) return `Rs. ${(price / 1000).toFixed(0)}K`;
    return `Rs. ${price.toLocaleString()}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const categoryColors = {
    'Hair Salons': 'bg-pink-50 text-pink-700 ring-pink-600/10',
    'Tattoo Parlors': 'bg-violet-50 text-violet-700 ring-violet-600/10',
    'Piercing Studios': 'bg-cyan-50 text-cyan-700 ring-cyan-600/10',
    'Barbershops': 'bg-blue-50 text-blue-700 ring-blue-600/10',
    'Nail Salons': 'bg-rose-50 text-rose-700 ring-rose-600/10',
    'Spa & Wellness': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
    'Beauty Supply': 'bg-amber-50 text-amber-700 ring-amber-600/10',
  };

  return (
    <Link
      to={`/ad/${ad.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ring-1 ring-inset backdrop-blur-sm ${categoryColors[ad.category] || 'bg-gray-50 text-gray-700 ring-gray-600/10'}`}>
          {ad.category}
        </span>

        {/* Wishlist button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>

        {/* Price tag floating at bottom of image */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {formatPrice(ad.price)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
          {ad.title}
        </h3>

        <div className="flex items-center gap-3 mt-2.5">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {ad.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {formatDate(ad.date)}
          </span>
        </div>
      </div>
    </Link>
  );
}
