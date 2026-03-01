import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ImagePlus, X, Phone, DollarSign, MapPin, Tag, FileText,
  Type, Upload, CheckCircle2, AlertCircle, Sparkles,
} from 'lucide-react';
import { categories, locations } from '../constants/seedData';
import { useAds } from '../context/AdsContext';
import { useAuth } from '../context/AuthContext';

const MAX_IMAGES = 5;

export default function PostAd() {
  const navigate = useNavigate();
  const { addAd } = useAds();
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [createdAd, setCreatedAd] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: currentUser?.category || '',
    price: '',
    location: currentUser?.location || '',
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > MAX_IMAGES) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(2),
    }));

    setImages((prev) => [...prev, ...newImages]);
    if (errors.images) setErrors((prev) => ({ ...prev, images: '' }));
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.category) newErrors.category = 'Select a category';
    if (!form.price || Number(form.price) <= 0) newErrors.price = 'Enter a valid price';
    if (!form.location) newErrors.location = 'Select a location';
    if (images.length === 0) newErrors.images = 'Upload at least one image';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newAd = await addAd({
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      location: form.location,
      image: images[0]?.preview || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      userId: currentUser.id,
      seller: {
        name: currentUser.businessName,
        phone: currentUser.phone,
        email: currentUser.email,
      },
    });

    setCreatedAd(newAd);
    setSubmitted(true);
  };

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Published!</h1>
          <p className="text-gray-500 mb-8">
            Your listing "<span className="font-medium text-gray-700">{form.title}</span>" is now live and visible to clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {createdAd && (
              <button
                onClick={() => navigate(`/ad/${createdAd.id}`)}
                className="btn-primary px-6 py-3 text-sm"
              >
                View Listing
              </button>
            )}
            <button
              onClick={() => navigate('/listings')}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Browse Listings
            </button>
            <button
              onClick={() => { setSubmitted(false); setCreatedAd(null); setForm({ title: '', description: '', category: currentUser?.category || '', price: '', location: currentUser?.location || '' }); setImages([]); }}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Add Another Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">List Your Business</h1>
          </div>
          <p className="text-gray-500 ml-[52px]">Fill in the details below to reach thousands of potential clients</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Image Upload ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100/80 p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                <ImagePlus className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Photos</h2>
                <p className="text-xs text-gray-500">Upload up to {MAX_IMAGES} images. First image is the cover.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {/* Previews */}
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-100 group"
                >
                  <img src={img.preview} alt="" className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1.5 left-1.5 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      COVER
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              ))}

              {/* Upload button */}
              {images.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-all hover:border-indigo-400 hover:bg-indigo-50/50 ${
                    errors.images ? 'border-red-300 bg-red-50/30' : 'border-gray-200'
                  }`}
                >
                  <Upload className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-medium text-gray-400">Add</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {errors.images && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.images}</p>}
          </div>

          {/* ── Ad Details ───────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100/80 p-6 space-y-5">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="font-bold text-gray-900">Listing Details</h2>
            </div>

            {/* Title */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                <Type className="w-3.5 h-3.5 text-gray-400" /> Title
              </label>
              <input
                type="text"
                placeholder='e.g. "Luxe Hair Studio — Color & Styling Specialists"'
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                maxLength={100}
                className={`input-modern ${errors.title ? 'ring-2 ring-red-500/20 border-red-300' : ''}`}
              />
              <div className="flex justify-between mt-1.5">
                {errors.title && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.title}</p>}
                <p className="text-xs text-gray-400 ml-auto">{form.title.length}/100</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-3.5 h-3.5 text-gray-400" /> Description
              </label>
              <textarea
                placeholder="Describe your business — services offered, specialties, experience, hours..."
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={5}
                maxLength={1000}
                className={`input-modern resize-none ${errors.description ? 'ring-2 ring-red-500/20 border-red-300' : ''}`}
              />
              <div className="flex justify-between mt-1.5">
                {errors.description && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.description}</p>}
                <p className="text-xs text-gray-400 ml-auto">{form.description.length}/1000</p>
              </div>
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" /> Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update('category', e.target.value)}
                  className={`input-modern ${errors.category ? 'ring-2 ring-red-500/20 border-red-300' : ''}`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.category}</p>}
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-3.5 h-3.5 text-gray-400" /> Starting Price (Rs.)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => update('price', e.target.value)}
                  className={`input-modern ${errors.price ? 'ring-2 ring-red-500/20 border-red-300' : ''}`}
                />
                {errors.price && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.price}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> Location
              </label>
              <select
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                className={`input-modern ${errors.location ? 'ring-2 ring-red-500/20 border-red-300' : ''}`}
              >
                <option value="">Select your city</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.location}</p>}
            </div>
          </div>

          {/* ── Contact Info (from profile) ──────────────────────── */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100/80 p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Phone className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Contact Information</h2>
                <p className="text-xs text-gray-500">Auto-filled from your profile</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-400 mb-0.5">Name</p>
                <p className="text-sm font-medium text-gray-900">{currentUser?.businessName}</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                <p className="text-sm font-medium text-gray-900">{currentUser?.phone}</p>
              </div>
              <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate">{currentUser?.email}</p>
              </div>
            </div>
          </div>

          {/* ── Preview & Submit ─────────────────────────────────── */}
          {(form.title || form.price) && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/60 p-6 animate-fade-in">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Preview</h3>
              <div className="flex items-center gap-4">
                {images[0] && (
                  <img src={images[0].preview} alt="" className="w-16 h-16 rounded-xl object-cover" />
                )}
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{form.title || 'Your listing title'}</p>
                  <p className="text-lg font-extrabold gradient-text">
                    {form.price ? `Rs. ${Number(form.price).toLocaleString()}` : 'Rs. 0'}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    {form.category && <span>{form.category}</span>}
                    {form.category && form.location && <span className="w-1 h-1 rounded-full bg-gray-300" />}
                    {form.location && <span>{form.location}</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Listing</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-4 text-sm font-semibold text-gray-600 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
