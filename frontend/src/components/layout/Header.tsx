import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, BookOpen, LogOut, User } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors">
            <BookOpen size={24} />
            <span className="text-xl font-bold">BiblioAfrika</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {state.isAuthenticated ? (
              <>
                <Link to="/books" className="text-gray-700 hover:text-green-600 transition-colors">
                  Mes Livres
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">
                    Bienvenue, {state.user?.username}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    leftIcon={<LogOut size={18} />}
                  >
                    Déconnexion
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600 transition-colors">
                  Connexion
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">S'inscrire</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4">
          <nav className="flex flex-col space-y-4">
            {state.isAuthenticated ? (
              <>
                <Link 
                  to="/books" 
                  className="text-gray-700 hover:text-green-600 transition-colors py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mes Livres
                </Link>
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center gap-2 py-2 px-4 text-gray-700">
                    <User size={18} />
                    <span>{state.user?.username}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    fullWidth 
                    onClick={handleLogout}
                    leftIcon={<LogOut size={18} />}
                    className="mt-2"
                  >
                    Déconnexion
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-green-600 transition-colors py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" fullWidth>
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;