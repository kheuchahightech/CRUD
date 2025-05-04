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
            <span className="text-lg font-semibold text-gray-800">BookShelf</span>
          </div>
          
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>© {currentYear} BookShelf. All rights reserved.</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between text-sm text-gray-500">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
              <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-indigo-600 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;