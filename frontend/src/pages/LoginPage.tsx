import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  
  // Rediriger si déjà connecté
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
            <h1 className="text-xl font-semibold">Se connecter</h1>
          </div>
          <Link 
            to="/register"
            className="text-indigo-100 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            <UserPlus size={16} />
            <span>S'inscrire</span>
          </Link>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Bienvenue ! Connectez-vous pour accéder à votre collection de livres.
          </p>
          
          <LoginForm onSuccess={() => navigate('/books')} />
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Vous n'avez pas de compte ?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Inscrivez-vous maintenant
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;