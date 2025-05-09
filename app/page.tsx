import { Header } from './components/Header';

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
        <div className="max-w-4xl w-full text-center space-y-8 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Hooray, you've got your app running!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            A simple Next.js, TypeScript, Supabase, and Clerk platform to kickstart your projects.
          </p>
          <div className="pt-4">
            <p className="text-lg text-gray-500 hover:text-gray-600 transition-colors duration-200">
              More information can be found at <a href="https://vibewind.com" className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors duration-200">vibewind.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 