import { requireAuthentication } from '@/utils/auth';

export default async function DashboardPage() {
  const { user, syncResult } = await requireAuthentication();
  const syncStatus = syncResult.success ? 'success' : 'error';
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {user.firstName || 'User'}!</h2>
            <p className="text-gray-600 text-lg">
              This is your personalized dashboard. 
              {syncStatus === 'error' && (
                <span className="text-red-500 ml-2">
                  (Note: There was an issue syncing your data. Some features may be limited.)
                </span>
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard cards/widgets would go here */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
              <div className="text-gray-600 space-y-3">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span> 
                  <span className="text-gray-700">{user.emailAddresses[0]?.emailAddress}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Name:</span> 
                  <span className="text-gray-700">{user.firstName} {user.lastName}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 