import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AdsContext = createContext(null);

export function AdsProvider({ children }) {
  const [ads, setAds] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAds();
    fetchReviews();
  }, []);

  const fetchAds = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAds(
        data.map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          price: row.price,
          category: row.category,
          location: row.location,
          image: row.image,
          date: row.created_at?.split('T')[0],
          userId: row.user_id,
          seller: {
            name: row.seller_name,
            phone: row.seller_phone,
            email: row.seller_email,
          },
        }))
      );
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const grouped = {};
      data.forEach((row) => {
        const adId = row.listing_id;
        if (!grouped[adId]) grouped[adId] = [];
        grouped[adId].push({
          id: row.id,
          user: row.user_name,
          rating: row.rating,
          comment: row.comment,
          date: row.created_at?.split('T')[0],
        });
      });
      setReviews(grouped);
    }
  };

  const addAd = useCallback(async (ad) => {
    const { data, error } = await supabase
      .from('listings')
      .insert({
        title: ad.title,
        description: ad.description,
        price: ad.price,
        category: ad.category,
        location: ad.location,
        image: ad.image,
        user_id: ad.userId,
        seller_name: ad.seller.name,
        seller_phone: ad.seller.phone,
        seller_email: ad.seller.email,
      })
      .select()
      .single();

    if (error) return null;

    const newAd = {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      location: data.location,
      image: data.image,
      date: data.created_at?.split('T')[0],
      userId: data.user_id,
      seller: {
        name: data.seller_name,
        phone: data.seller_phone,
        email: data.seller_email,
      },
    };

    setAds((prev) => [newAd, ...prev]);
    return newAd;
  }, []);

  const deleteAd = useCallback(async (adId) => {
    const { error } = await supabase.from('listings').delete().eq('id', adId);
    if (!error) {
      setAds((prev) => prev.filter((ad) => ad.id !== adId));
    }
  }, []);

  const addReview = useCallback(async (adId, review) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        listing_id: adId,
        user_name: review.user,
        rating: review.rating,
        comment: review.comment,
      })
      .select()
      .single();

    if (!error && data) {
      const newReview = {
        id: data.id,
        user: data.user_name,
        rating: data.rating,
        comment: data.comment,
        date: data.created_at?.split('T')[0],
      };
      setReviews((prev) => ({
        ...prev,
        [adId]: [newReview, ...(prev[adId] || [])],
      }));
    }
  }, []);

  return (
    <AdsContext.Provider value={{ ads, reviews, loading, addAd, deleteAd, addReview }}>
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  const ctx = useContext(AdsContext);
  if (!ctx) throw new Error('useAds must be used within AdsProvider');
  return ctx;
}
