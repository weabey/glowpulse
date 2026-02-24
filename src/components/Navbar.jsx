import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, LogIn, UserPlus, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/listings', label: 'Browse Listings' },
  ];

  const isActive = (path) => location.pathname === path;

  const initials = currentUser?.businessName
    ? currentUser.businessName.charAt(0).toUpperCase()
    : currentUser?.email?.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-glass border-b border-gray-100/50'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo size={36} className="shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow duration-300 rounded-xl" />
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-gray-900">Ceylon</span>
              <span className="gradient-text"> Beauty</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-200 mx-3" />

            {currentUser ? (
              <>
                <Link
                  to="/post"
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>List Business</span>
                </Link>

                {/* User dropdown */}
                <div className="relative ml-2" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                      {currentUser.profileImage ? (
                        <img src={currentUser.profileImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {currentUser.businessName}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 animate-fade-in">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                        Dashboard
                      </Link>
                      <div className="my-1 border-t border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-white/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(link.to)
                  ? 'bg-teal-50 text-teal-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive('/dashboard')
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/post"
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-sm mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>List Business</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all mt-1"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-sm mt-2"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
