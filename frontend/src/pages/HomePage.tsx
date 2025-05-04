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
              Votre bibliothèque personnelle,<br />
              <span className="text-amber-300">organisée et accessible</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
              Gérez facilement votre collection de livres avec BiblioAfrika.
              Classez vos livres par catégories, suivez ceux que vous avez lus ou que
              vous souhaitez lire, et ne perdez plus jamais le fil.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {state.isAuthenticated ? (
                <Link to="/books">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<BookOpen size={20} />}
                  >
                    Mes Livres
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
                      S'inscrire
                    </Button>
                  </Link>
                  
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="lg"
                      className="bg-white/10 hover:bg-white/20 text-white"
                    >
                      Se connecter
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
            Tout ce dont vous avez besoin pour gérer vos livres
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BookText size={24} className="text-indigo-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Votre Collection de Livres
              </h3>
              
              <p className="text-gray-600">
                Ajoutez tous vos livres à votre collection personnelle. 
                Suivez ce que vous avez lu, ce que vous possédez 
                et ce que vous souhaitez lire ensuite.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-amber-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Organisez &amp; Classez
              </h3>
              
              <p className="text-gray-600">
                Groupez vos livres par catégories, 
                auteurs et année de publication. Trouvez exactement ce que vous cherchez 
                grâce à une recherche et des filtres puissants.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} className="text-teal-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accès Sécurisé
              </h3>
              
              <p className="text-gray-600">
                Votre collection personnelle est protégée grâce à l'authentification utilisateur. Accédez à votre bibliothèque 
                depuis n'importe quel appareil avec votre compte.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à commencer à gérer vos livres ?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez  BiblioAfrika dès aujourd'hui et découvrez à quel point il est facile d'organiser 
            et de profiter de votre collection de livres.
          </p>
          
          <div className="flex justify-center">
            {state.isAuthenticated ? (
              <Link to="/books">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<BookOpen size={20} />}
                >
                  Aller à Mes Livres
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<UserPlus size={20} />}
                >
                  Créer un Compte
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