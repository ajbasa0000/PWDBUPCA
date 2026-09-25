import { supabase, isSupabaseConfigured } from './supabase';
import { UserProfile, UserRole, DisabilityType } from '@/types';

// Convert Supabase profile row to app UserProfile
export function mapSupabaseToUserProfile(row: any): UserProfile {
  return {
    id: row.id,
    fullName: row.full_name || '',
    username: row.username || (row.email ? row.email.split('@')[0] : ''),
    password: row.password || '',
    email: row.email || '',
    role: (row.role as UserRole) || 'member_operator',
    disability: (row.disability as DisabilityType) || 'None',
    phone: row.contact_number || row.phone || '',
    avatar: row.avatar || '',
  };
}

// Convert app UserProfile to Supabase profiles row
export function mapUserProfileToSupabase(user: Partial<UserProfile>) {
  return {
    full_name: user.fullName,
    username: user.username,
    password: user.password,
    email: user.email,
    role: user.role || 'member_operator',
    disability: user.disability || 'None',
    contact_number: user.phone || '',
    active_status: true,
  };
}

// Fetch all profiles from Supabase
export async function fetchProfilesFromSupabase(): Promise<UserProfile[] | null> {
  if (!supabase || !isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetchProfiles error:', error.message);
      return null;
    }
    if (data && Array.isArray(data)) {
      return data.map(mapSupabaseToUserProfile);
    }
    return [];
  } catch (err) {
    console.warn('Supabase fetchProfiles exception:', err);
    return null;
  }
}

// Insert or update profile in Supabase
export async function upsertProfileInSupabase(user: UserProfile): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;
  try {
    const payload: any = {
      full_name: user.fullName,
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
      disability: user.disability,
      contact_number: user.phone,
      active_status: true,
    };

    // If ID is a valid UUID, include it
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id);
    if (isValidUUID) {
      payload.id = user.id;
    }

    const { error } = await supabase
      .from('profiles')
      .upsert(payload);

    if (error) {
      console.warn('Supabase upsertProfile error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase upsertProfile exception:', err);
    return false;
  }
}

// Delete profile in Supabase
export async function deleteProfileFromSupabase(id: string): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Supabase deleteProfile error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteProfile exception:', err);
    return false;
  }
}
