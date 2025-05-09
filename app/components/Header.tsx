import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

export async function Header() {
  const { userId } = await auth();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black flex items-center gap-2">
          <Image src="/logo.svg" className="py-2" alt="Vibewind Starter" width={30} height={30} />
          Vibewind Starter
        </Link>
        
        <nav className="flex items-center space-x-6">
          
          {userId ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex space-x-4">
              <Link 
                href="/sign-in"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
} 