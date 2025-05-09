import { SignUp } from '@clerk/nextjs';
import { Header } from '@/app/components/Header';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-sm normal-case',
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/onboarding"
          />
        </div>
      </div>
    </div>
  );
} 