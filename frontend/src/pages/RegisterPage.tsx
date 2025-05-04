import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  

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
            <UserPlus size={20} />
            <h1 className="text-xl font-semibold">Créer un compte</h1>
          </div>
          <Link 
            to="/login"
            className="text-indigo-100 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            <LogIn size={16} />
            <span>Se connecter</span>
          </Link>
        </div>
    
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Inscrivez-vous pour commencer à gérer votre collection personnelle de livres.
          </p>
          
          <RegisterForm onSuccess={() => navigate('/books')} />
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Connectez-vous maintenant
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;