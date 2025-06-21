import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserProfileSummary = () => {
  const { user } = useAuth();
  
  // Don't render anything if no user is logged in
  if (!user) {
    return null;
  }

  return (
    <motion.section 
      className="py-12 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Profile Info */}
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.displayName || 'User'}!
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Member'}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-gray-600">Interviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">8.7</p>
                <p className="text-sm text-gray-600">Avg. Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>

            {/* Action Button */}
            <Link 
              to="/profile"
              className="w-full md:w-auto px-6 py-3 bg-white text-primary border border-primary rounded-lg font-medium hover:bg-primary/5 transition-colors text-center"
            >
              View Full Profile
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">New Interview</span>
              </button>
              <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Schedule</span>
              </button>
              <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">History</span>
              </button>
              <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex flex-col items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default UserProfileSummary;
