import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Tag, Calendar, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAds } from '../context/AdsContext';
import { categories, locations } from '../constants/seedData';
import AdCard from '../components/ui/AdCard';

export default function Dashboard() {
  const { currentUser, updateProfile } = useAuth();
  const { ads, reviews, deleteAd } = useAds();
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    businessName: currentUser.businessName,
    category: currentUser.category,
    location: currentUser.location,
    bio: currentUser.bio || '',
    phone: currentUser.phone,
  });

  const myAds = ads.filter((ad) => ad.userId === currentUser.id);

  const myReviewCount = myAds.reduce((count, ad) => {
    return count + (reviews[ad.id]?.length || 0);
  }, 0);

  const handleSaveProfile = async () => {
    await updateProfile(profileForm);
    setEditing(false);
  };

  const handleDeleteAd = async (adId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await deleteAd(adId);
    }
  };

  const initials = currentUser.businessName
    ? currentUser.businessName.charAt(0).toUpperCase()
    : currentUser.email.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-8">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500" />

          <div className="px-6 sm:px-8 pb-6 sm:pb-8 -mt-12">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                {currentUser.profileImage ? (
                  <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-teal-600">{initials}</span>
                )}
              </div>

              <div className="flex-1">
                {!editing ? (
                  <>
                    <h1 className="text-2xl font-extrabold text-gray-900">{currentUser.businessName}</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" />{currentUser.category}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{currentUser.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Member since {currentUser.createdAt}</span>
                    </div>
                    {currentUser.bio && (
                      <p className="text-sm text-gray-600 mt-3 max-w-lg">{currentUser.bio}</p>
                    )}
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <input
                      type="text"
                      value={profileForm.businessName}
                      onChange={(e) => setProfileForm((p) => ({ ...p, businessName: e.target.value }))}
                      className="input-modern"
                      placeholder="Business Name"
                    />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm((p) => ({ ...p, phone: e.target.value }))}
                      className="input-modern"
                      placeholder="Phone"
                    />
                    <select
                      value={profileForm.category}
                      onChange={(e) => setProfileForm((p) => ({ ...p, category: e.target.value }))}
                      className="input-modern"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <select
                      value={profileForm.location}
                      onChange={(e) => setProfileForm((p) => ({ ...p, location: e.target.value }))}
                      className="input-modern"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm((p) => ({ ...p, bio: e.target.value }))}
                      className="input-modern sm:col-span-2 resize-none"
                      rows={2}
                      placeholder="Bio"
                    />
                  </div>
                )}
              </div>

              <div className="shrink-0">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
                    >
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Listings', value: myAds.length },
                { label: 'Reviews', value: myReviewCount },
                { label: 'Member', value: currentUser.createdAt?.slice(0, 7) || 'N/A' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Listings ({myAds.length})</h2>
          <Link
            to="/post"
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Listing
          </Link>
        </div>

        {myAds.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-500 text-sm mb-6">Start by adding your first business listing.</p>
            <Link to="/post" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm">
              <Plus className="w-4 h-4" /> Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myAds.map((ad) => (
              <div key={ad.id} className="relative group">
                <AdCard ad={ad} />
                <button
                  onClick={() => handleDeleteAd(ad.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                  title="Delete listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
