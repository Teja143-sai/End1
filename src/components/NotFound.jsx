import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Page not found</h2>
          <p className="mt-4 text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="mt-8">
          <Link
            to="/"
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-primary-200 group-hover:text-primary-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            Go back home
          </Link>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-medium text-gray-500">Looking for something else?</h3>
          <nav className="mt-4 flex justify-center space-x-6">
            <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
            <Link to="/signup" className="text-sm font-medium text-primary hover:text-primary/80">
              Create an account
            </Link>
            <a href="mailto:support@example.com" className="text-sm font-medium text-primary hover:text-primary/80">
              Contact support
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
