import { User } from "@clerk/nextjs/server";
import { supabaseAdmin } from "./supabase";

export type SyncResult = {
  success: boolean;
  error?: any;
  action?: 'created' | 'updated' | null;
  userId?: string;
};

/**
 * Synchronizes the Clerk user data with Supabase
 * Uses admin client with service role to bypass RLS
 */
export async function syncUserWithSupabase(user: User): Promise<SyncResult> {
  try {
    // Extract user data from Clerk
    const email = user.emailAddresses[0]?.emailAddress || '';
    
    if (!email) {
      return { 
        success: false, 
        error: new Error('User has no email address') 
      };
    }
    
    // Prepare user data
    const userData = {
      clerk_id: user.id,
      email,
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      updated_at: new Date().toISOString(),
    };
    
    // Use upsert to handle both insert and update in a single operation
    // This is the simplest and most reliable approach
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert({
        id: crypto.randomUUID(), // Only used for new records
        created_at: new Date().toISOString(), // Only used for new records
        ...userData
      }, { 
        onConflict: 'email', 
        ignoreDuplicates: false // Update the record if it exists
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error syncing user:', error);
      return { success: false, error };
    }
    
    // Determine if this was a creation or update
    const isCreated = data.created_at === data.updated_at;
    
    return {
      success: true,
      action: isCreated ? 'created' : 'updated',
      userId: data.id
    };
  } catch (error) {
    console.error('Error syncing user data:', error);
    return { success: false, error };
  }
} 