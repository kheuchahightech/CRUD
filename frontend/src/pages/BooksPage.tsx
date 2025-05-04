import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import BookList from '../components/books/BookList';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';

const BooksPage: React.FC = () => {
  const { state: authState } = useAuth();
  const { fetchBooks } = useBooks();
  
  // Fetch books when component mounts
  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchBooks();
    }
  }, [authState.isAuthenticated]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={24} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Book Collection</h1>
        </div>
        <p className="text-gray-600">
          Manage and organize all your books in one place.
        </p>
      </div>
      
      <BookList />
    </div>
  );
};

export default BooksPage;