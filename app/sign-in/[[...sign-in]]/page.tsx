import { SignIn } from '@clerk/nextjs';
import { Header } from '@/app/components/Header';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-sm normal-case',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
} 