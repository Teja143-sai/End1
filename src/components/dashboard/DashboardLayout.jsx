import { useState, useEffect, useCallback, Suspense } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ErrorBoundary from '../ErrorBoundary';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import { 
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  BellIcon,
  ClockIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: HomeIcon, current: true },
  { name: 'Interviews', href: 'interviews', icon: VideoCameraIcon, current: false },
  { name: 'Candidates', href: 'candidates', icon: UserGroupIcon, current: false },
  { name: 'Schedule', href: 'schedule', icon: CalendarIcon, current: false },
  { name: 'Analytics', href: 'analytics', icon: ChartBarIcon, current: false },
  { name: 'Settings', href: 'settings', icon: Cog6ToothIcon, current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: 'profile' },
  { name: 'Settings', href: 'settings' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout({ children, userType = 'interviewee' }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get user initials for avatar
  const getUserInitials = (user) => {
    if (!user) return 'U';
    const name = user.displayName || user.email || '';
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // No need for role verification here as it's handled by ProtectedRoute
  
  // Update navigation items based on user type
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getNavigation = useCallback(() => {
    try {
      const baseNav = [
        { 
          name: 'Back to Home', 
          href: '/', 
          icon: ArrowLeftOnRectangleIcon, 
          current: false,
          external: true,
          'aria-label': 'Go back to home page'
        }
      ];

      if (userType === 'interviewer') {
        return [
          ...baseNav,
          { name: 'Dashboard', href: '/interviewer/dashboard', icon: HomeIcon, current: location?.pathname === '/interviewer/dashboard' },
          { name: 'Interviews', href: '/interviewer/interviews', icon: VideoCameraIcon, current: location?.pathname === '/interviewer/interviews' },
          { name: 'Candidates', href: '/interviewer/candidates', icon: UserGroupIcon, current: location?.pathname === '/interviewer/candidates' },
          { name: 'Schedule', href: '/interviewer/schedule', icon: CalendarIcon, current: location?.pathname === '/interviewer/schedule' },
          { name: 'Analytics', href: '/interviewer/analytics', icon: ChartBarIcon, current: location?.pathname === '/interviewer/analytics' },
          { name: 'Settings', href: '/interviewer/settings', icon: Cog6ToothIcon, current: location?.pathname === '/interviewer/settings' },
        ];
      } else {
        return [
          ...baseNav,
          { name: 'Dashboard', href: '/interviewee/dashboard', icon: HomeIcon, current: location?.pathname === '/interviewee/dashboard' },
          { name: 'Interviews', href: '/interviewee/interviews', icon: VideoCameraIcon, current: location?.pathname === '/interviewee/interviews' },
          { name: 'Practice', href: '/interviewee/practice', icon: ClockIcon, current: location?.pathname === '/interviewee/practice' },
          { name: 'Feedback', href: '/interviewee/feedback', icon: ChartBarIcon, current: location?.pathname === '/interviewee/feedback' },
          { name: 'Resources', href: '/interviewee/resources', icon: QuestionMarkCircleIcon, current: location?.pathname === '/interviewee/resources' },
          { name: 'Settings', href: '/interviewee/settings', icon: Cog6ToothIcon, current: location?.pathname === '/interviewee/settings' },
        ];
      }
    } catch (error) {
      console.error('Error in getNavigation:', error);
      return [];
    }
  }, [userType, location?.pathname]);

  const currentNav = getNavigation();

  // Handle user navigation actions
  const handleUserAction = (action) => {
    switch (action) {
      case 'Sign out':
        handleSignOut();
        break;
      case 'Your Profile':
        navigate(`/${userType}/profile`);
        break;
      case 'Settings':
        navigate(`/${userType}/settings`);
        break;
      default:
        break;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col h-screen overflow-hidden" role="main" aria-busy={isLoading}>
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <Bars color="#4F46E5" height={50} width={50} />
          </div>
        )}
      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col w-64 bg-white h-full">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex items-center justify-center h-12 px-3 border-b border-gray-200">
              <h1 className="text-lg font-garamond font-bold text-primary">RI Connect</h1>
            </div>
            <nav className="flex-1 px-2 space-y-0.5 py-2">
              {currentNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-1.5 text-sm rounded'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 p-2">
            <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'items-center'}`}>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs" aria-label="User avatar">
                {getUserInitials(user)}
              </div>
              {!isCollapsed && (
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-900 truncate max-w-[140px]">
                    {user?.displayName || user?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userType === 'interviewer' ? 'Interviewer' : 'Interviewee'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="flex flex-1 overflow-hidden w-full">
        {/* Static sidebar for desktop */}
        <div className={`hidden lg:flex flex-col flex-shrink-0 ${isCollapsed ? 'w-16' : 'w-56'} transition-all duration-200 ease-in-out`}>
          <div className={`flex flex-col border-r border-gray-200 bg-white h-full w-full ${isCollapsed ? 'items-center' : ''}`}>
            <div className="flex-1 flex flex-col overflow-y-auto w-full">
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} h-12 px-3 border-b border-gray-200`}>
                {!isCollapsed && <h1 className="text-lg font-garamond font-bold text-primary">RI Connect</h1>}
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {isCollapsed ? (
                    <Bars3Icon className="h-5 w-5" />
                  ) : (
                    <XMarkIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <nav className={`flex-1 px-2 space-y-0.5 py-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                {currentNav.map((item) => {
                  const itemContent = (
                    <>
                      <span className="sr-only">{item.name} icon</span>
                      <item.icon
                        className={classNames(
                          item.current ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 h-5 w-5',
                          isCollapsed ? 'mx-auto' : 'mr-3'
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && item.name}
                    </>
                  );

                  return item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-1.5 text-sm rounded'
                      )}
                    >
                      {itemContent}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-1.5 text-sm rounded'
                      )}
                    >
                      {itemContent}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 p-2">
              <div className={`flex ${isCollapsed ? 'flex-col items-center' : 'items-center'}`}>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs" aria-label="User avatar">
                  {getUserInitials(user)}
                </div>
                {!isCollapsed && (
                  <div className="ml-2">
                    <p className="text-xs font-medium text-gray-900 truncate max-w-[140px]" title={user?.displayName || user?.email || 'User'}>
                      {user?.displayName || user?.email || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userType === 'interviewer' ? 'Interviewer' : 'Interviewee'}
                    </p>
                    <div className="mt-1">
                      {userNavigation.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleUserAction(item.name)}
                          className="text-xs text-gray-600 hover:text-primary mr-2 last:mr-0"
                          disabled={isLoading}
                          aria-label={item.name}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className={`flex-1 overflow-auto focus:outline-none transition-all duration-200 ${isCollapsed ? 'w-[calc(100%-4rem)] ml-16' : 'w-[calc(100%-14rem)] ml-56'}`}>
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-12 bg-white border-b border-gray-200">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex items-center">
                <h1 className="text-lg font-medium text-gray-900">
                  {currentNav.find(item => item.current)?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="ml-4 flex items-center">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm" aria-label="User menu">
                        {getUserInitials(user)}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto w-full h-full">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Bars color="#3B82F6" height={40} width={40} />
                </div>
              }>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}
