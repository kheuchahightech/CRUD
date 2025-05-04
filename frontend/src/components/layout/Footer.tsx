import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BookOpen size={20} className="text-indigo-600" />
            <span className="text-lg font-semibold text-gray-800">BiblioAfrika</span>
          </div>
          
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>Développé par</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>Cheikh Abdou Khadre DIALLO{currentYear} BiblioAfrika. Tous droits réservés.</span>
          </div>

        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-500">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
              <a href="#" className="hover:text-indigo-600 transition-colors">À propos</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Conditions d'utilisation</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-6">
              <a href="https://x.com/Cheikhabdou21" className="hover:text-indigo-600 transition-colors">
                Twitter
              </a>
              <a href="https://github.com/kheuchahightech" className="hover:text-indigo-600 transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/cheikh-abdou-khadre-diallo/" className="hover:text-indigo-600 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600 flex justify-center">
            <span>Développé par <strong>Cheikh Abdou Khadre Diallo</strong></span>
          </div>
          <div className="text-sm text-gray-600 flex justify-center mt-2">
            <span>Téléphone : <a href="tel:+221754417623" className="text-indigo-600">+221 75 441 76 23</a></span>
          </div>
          <div className="text-sm text-gray-600 flex justify-center mt-2">
            <span>Email : <a href="mailto:cheikhabdoukhadre1@gmail.com" className="text-indigo-600">cheikhabdoukhadre1@gmail.com</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;