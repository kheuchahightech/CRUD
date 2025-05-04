import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UserPlus, BookText, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { state } = useAuth();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
              Your Personal Library,<br />
              <span className="text-amber-300">Organized and Accessible</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Easily manage your book collection with BookShelf. Keep track of all your books,
              organize them by categories, and never forget what you've read or want to read.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {state.isAuthenticated ? (
                <Link to="/books">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<BookOpen size={20} />}
                  >
                    My Books
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button
                      variant="secondary"
                      size="lg"
                      leftIcon={<UserPlus size={20} />}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-white/10 hover:bg-white/20 text-white"
                    >
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-wave-pattern h-24 bg-white" />
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Manage Your Books
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BookText size={24} className="text-indigo-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book Collection
              </h3>
              
              <p className="text-gray-600">
                Add all your books to your personal collection. Keep track of what you've read, what you own, and what you'd like to read next.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-amber-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Organize &amp; Categorize
              </h3>
              
              <p className="text-gray-600">
                Group books by categories, authors, and publication year. Find exactly what you're looking for with powerful search and filters.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} className="text-teal-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Secure Access
              </h3>
              
              <p className="text-gray-600">
                Your personal book collection is secure with user authentication. Access your library from any device with your account.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Managing Your Books?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join BookShelf today and discover how easy it is to organize and enjoy your book collection.
          </p>
          
          <div className="flex justify-center">
            {state.isAuthenticated ? (
              <Link to="/books">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<BookOpen size={20} />}
                >
                  Go to My Books
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<UserPlus size={20} />}
                >
                  Create an Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;