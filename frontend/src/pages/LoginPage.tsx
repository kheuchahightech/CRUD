import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/books');
    }
  }, [state.isAuthenticated, navigate]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogIn size={20} />
            <h1 className="text-xl font-semibold">Log In</h1>
          </div>
          <Link 
            to="/register"
            className="text-indigo-100 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            <UserPlus size={16} />
            <span>Register</span>
          </Link>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Welcome back! Log in to access your book collection.
          </p>
          
          <LoginForm onSuccess={() => navigate('/books')} />
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;