import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { syncUserWithSupabase, SyncResult } from "./user-sync";

export type AuthenticatedUserResult = {
  user: User;
  syncResult: SyncResult;
};

/**
 * Ensures the user is authenticated and syncs their data with Supabase
 * Use this in pages that require authentication
 * 
 * @param redirectTo Where to redirect if not authenticated (defaults to /sign-in)
 * @returns Object containing the user and sync result
 */
export async function requireAuthentication(redirectTo: string = '/sign-in'): Promise<AuthenticatedUserResult> {
  const user = await currentUser();
  
  if (!user) {
    redirect(redirectTo);
  }
  
  // Sync user data with Supabase
  const syncResult = await syncUserWithSupabase(user);
  
  return {
    user,
    syncResult,
  };
} 