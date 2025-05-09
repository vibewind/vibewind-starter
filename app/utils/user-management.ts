import { supabase } from '@/utils/supabase';
import type { User } from '@clerk/nextjs/server';

/**
 * Creates or updates a user in the Supabase database
 */
export async function syncUserToSupabase(user: User) {
  if (!user) return null;
  
  const userData = {
    clerk_id: user.id,
    email: user.emailAddresses[0]?.emailAddress || '',
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    updated_at: new Date().toISOString(),
  };

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', user.id)
    .maybeSingle();

  if (existingUser) {
    // Update existing user
    const { error } = await supabase
      .from('users')
      .update(userData)
      .eq('clerk_id', user.id);
    
    if (error) {
      console.error('Error updating user:', error);
      throw new Error(`Failed to update user: ${error.message}`);
    }
    
    return existingUser.id;
  } else {
    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: crypto.randomUUID(), ...userData }])
      .select()
      .single();
    
    if (error) {
      console.error('Error inserting user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    return data.id;
  }
}

/**
 * Deletes a user from the Supabase database
 */
export async function deleteUserFromSupabase(clerkId: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('clerk_id', clerkId);
  
  if (error) {
    console.error('Error deleting user:', error);
    throw new Error(`Failed to delete user: ${error.message}`);
  }
  
  return true;
} 