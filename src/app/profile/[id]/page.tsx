export default function UserProfile({ params }: any) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-700/40 bg-gradient-to-br from-gray-900 to-gray-800/60 p-8 shadow-xl backdrop-blur text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-200 tracking-tight">👤 User Profile</h1>
  
          <p className="text-slate-400">This is the profile page for:</p>
  
          <div className="text-sm text-white bg-orange-500 px-4 py-2 rounded-lg font-mono shadow">
            {params.id}
          </div>
        </div>
      </div>
    );
  }
  