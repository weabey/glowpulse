import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Browse Listings' },
    { to: '/listings?category=Hair+Salons', label: 'Hair Salons' },
    { to: '/listings?category=Tattoo+Parlors', label: 'Tattoo Parlors' },
    { to: '/listings?category=Piercing+Studios', label: 'Piercing Studios' },
  ];

  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-r from-teal-600/10 via-emerald-600/10 to-cyan-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <Logo size={36} className="shadow-lg shadow-teal-500/20 rounded-xl" />
              <span className="text-xl font-extrabold tracking-tight text-white">
                Ceylon<span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400"> Beauty</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Your trusted directory for salons, tattoo parlors, and piercing studios. Discover top-rated beauty professionals near you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group/link flex items-center gap-1 text-sm text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li className="hover:text-gray-300 transition-colors">support@ceylonbeauty.com</li>
              <li className="hover:text-gray-300 transition-colors">+94 11 234 5678</li>
              <li className="hover:text-gray-300 transition-colors">42 Galle Road, Colombo 03</li>
            </ul>
            {/* Newsletter-style CTA */}
            <div className="mt-6 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 transition-colors"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-teal-500/20 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Ceylon Beauty. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  );
}
