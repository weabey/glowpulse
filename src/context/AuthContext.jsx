import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signingOut = useRef(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (signingOut.current) return;

        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
          await fetchProfile(session.user);
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (authUser) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    setCurrentUser({
      id: authUser.id,
      email: authUser.email,
      businessName: profile?.business_name || '',
      category: profile?.category || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      phone: profile?.phone || '',
      profileImage: profile?.profile_image || '',
      createdAt: profile?.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    });
    setLoading(false);
  };

  const register = async ({ email, password, phone, businessName, category, location, bio, profileImage }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Insert business profile into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      business_name: businessName,
      category,
      location,
      bio: bio || '',
      phone,
      profile_image: profileImage || '',
    });

    if (profileError) {
      return { success: false, error: profileError.message };
    }

    // Set user immediately (onAuthStateChange will also fire)
    setCurrentUser({
      id: data.user.id,
      email,
      businessName,
      category,
      location,
      bio: bio || '',
      phone,
      profileImage: profileImage || '',
      createdAt: new Date().toISOString().split('T')[0],
    });

    return { success: true };
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const logout = async () => {
    signingOut.current = true;
    setCurrentUser(null);
    setLoading(false);
    await supabase.auth.signOut({ scope: 'local' });
    signingOut.current = false;
  };

  const updateProfile = async (fields) => {
    if (!currentUser) return { success: false, error: 'Not logged in.' };

    const updates = {};
    if (fields.businessName !== undefined) updates.business_name = fields.businessName;
    if (fields.category !== undefined) updates.category = fields.category;
    if (fields.location !== undefined) updates.location = fields.location;
    if (fields.bio !== undefined) updates.bio = fields.bio;
    if (fields.phone !== undefined) updates.phone = fields.phone;
    if (fields.profileImage !== undefined) updates.profile_image = fields.profileImage;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', currentUser.id);

    if (error) {
      return { success: false, error: error.message };
    }

    setCurrentUser((prev) => ({ ...prev, ...fields }));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
