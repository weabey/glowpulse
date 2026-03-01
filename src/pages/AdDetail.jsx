import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Tag, User, Phone, Mail, Shield, Share2, Heart, ExternalLink, MessageSquare, Send, Star } from 'lucide-react';
import { useAds } from '../context/AdsContext';
import AdCard from '../components/ui/AdCard';
import StarRating from '../components/ui/StarRating';

export default function AdDetail() {
  const { id } = useParams();
  const { ads, reviews: allReviews, addReview } = useAds();
  const adId = isNaN(id) ? id : Number(id);
  const ad = ads.find((a) => a.id === adId);

  const existingReviews = allReviews[adId] || [];
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h1>
          <p className="text-gray-500 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/listings" className="btn-primary inline-block px-6 py-3 text-sm">
            Browse all listings
          </Link>
        </div>
      </div>
    );
  }

  const relatedAds = ads
    .filter((a) => a.category === ad.category && a.id !== ad.id)
    .slice(0, 3);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatShortDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const avgRating = existingReviews.length
    ? (existingReviews.reduce((sum, r) => sum + r.rating, 0) / existingReviews.length).toFixed(1)
    : null;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: existingReviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newRating || !newComment.trim() || !reviewerName.trim()) return;

    const review = {
      user: reviewerName.trim(),
      rating: newRating,
      comment: newComment.trim(),
    };

    await addReview(adId, review);
    setNewRating(0);
    setNewComment('');
    setReviewerName('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-card group">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-64 sm:h-80 md:h-[28rem] object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white hover:shadow-md transition-all hover:scale-105">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white hover:shadow-md transition-all hover:scale-105">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              {avgRating && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-gray-900">{avgRating}</span>
                  <span className="text-xs text-gray-500">({existingReviews.length})</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full ring-1 ring-inset mb-4 ${categoryColors[ad.category] || 'bg-gray-50 text-gray-700 ring-gray-600/10'}`}>
                    {ad.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{ad.title}</h1>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl px-5 py-3 border border-indigo-100/50">
                  <p className="text-sm text-gray-500 font-medium">Starting at</p>
                  <p className="text-2xl md:text-3xl font-extrabold gradient-text">
                    Rs. {ad.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                {[
                  { icon: MapPin, label: ad.location },
                  { icon: Calendar, label: formatDate(ad.date) },
                  { icon: Tag, label: ad.category },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg"
                  >
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                    {label}
                  </span>
                ))}
              </div>

              <hr className="my-6 border-gray-100" />

              <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {ad.description}
              </p>
            </div>

            {/* Reviews & Ratings */}
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Reviews & Ratings</h2>
              </div>

              {/* Rating Summary */}
              {existingReviews.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
                  <div className="text-center sm:text-left shrink-0">
                    <p className="text-5xl font-extrabold text-gray-900">{avgRating}</p>
                    <StarRating rating={Math.round(Number(avgRating))} readonly size="md" />
                    <p className="text-sm text-gray-500 mt-1">{existingReviews.length} review{existingReviews.length !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {ratingDistribution.map(({ star, count }) => (
                      <div key={star} className="flex items-center gap-2.5">
                        <span className="text-sm font-medium text-gray-500 w-3">{star}</span>
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                            style={{
                              width: existingReviews.length
                                ? `${(count / existingReviews.length) * 100}%`
                                : '0%',
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-5 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Write Review */}
              <form onSubmit={handleSubmitReview} className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Write a Review</h3>

                {reviewSubmitted && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-700 font-medium animate-fade-in">
                    Thanks for your feedback! Your review has been posted.
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Your rating</p>
                  <StarRating rating={newRating} onRate={setNewRating} size="lg" />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="input-modern"
                  />
                </div>

                <div className="relative mb-3">
                  <textarea
                    placeholder="Share your experience with this business..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="input-modern resize-none pr-14"
                  />
                  <button
                    type="submit"
                    disabled={!newRating || !newComment.trim() || !reviewerName.trim()}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Review list */}
              {existingReviews.length > 0 ? (
                <div className="space-y-4">
                  {existingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {review.user.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{review.user}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRating rating={review.rating} readonly size="sm" />
                            <span className="text-xs text-gray-400">{formatShortDate(review.date)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>

          {/* Seller Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100/50">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Business Contact</h3>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{ad.seller.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="text-xs text-gray-500">Active business</p>
                  </div>
                </div>
              </div>

              {avgRating && (
                <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-xl bg-amber-50/70 border border-amber-100/60">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-gray-900">{avgRating}</span>
                  <span className="text-xs text-gray-500">({existingReviews.length} reviews)</span>
                </div>
              )}

              <div className="space-y-3">
                <a
                  href={`tel:${ad.seller.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ad.seller.phone}</span>
                </a>

                <a
                  href={`mailto:${ad.seller.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{ad.seller.email}</span>
                </a>
              </div>

              <a
                href={`mailto:${ad.seller.email}?subject=Inquiry about: ${ad.title}`}
                className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 mt-5 text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Business</span>
              </a>
            </div>

            {/* Safety Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100/80">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-700" />
                </div>
                <h4 className="font-bold text-amber-900">Safety Tips</h4>
              </div>
              <ul className="text-sm text-amber-800/80 space-y-2">
                {[
                  'Check reviews before booking',
                  'Verify the studio is licensed',
                  'Ask about sterilization practices',
                  'Request a consultation first',
                ].map((tip) => (
                  <li key={tip} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Ads */}
        {relatedAds.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Similar Listings</h2>
                <p className="text-gray-500 mt-1 text-sm">More in {ad.category}</p>
              </div>
              <Link
                to={`/listings?category=${encodeURIComponent(ad.category)}`}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAds.map((related, i) => (
                <div key={related.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <AdCard ad={related} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
