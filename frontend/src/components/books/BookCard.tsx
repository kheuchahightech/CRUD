import React from 'react';
import { Book, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { Book as BookType } from '../../types';

interface BookCardProps {
  book: BookType;
  onView: (book: BookType) => void;
  onEdit: (book: BookType) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onView, onEdit, onDelete }) => {
  
  const getCover = () => {
    if (book.cover && book.cover.startsWith('http')) {
      return book.cover;
    }
    
    const seed = book.title.charAt(0).toLowerCase();
    return `https://picsum.photos/seed/${seed}/300/400`;
  };
  
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative pb-[140%] overflow-hidden bg-gray-200">
        <img
          src={getCover()}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={book.title}>
          {book.title}
        </h3>
        
        <p className="text-gray-600 text-sm mt-1">
          par {book.author}
        </p>
        
        <div className="mt-2 mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
            {book.category}
          </span>
          <span className="inline-block ml-2 text-xs text-gray-500">
            Publié en {book.publishedYear}
          </span>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2 min-h-[2.5rem]">
          {book.description}
        </p>
        
        <div className="text-xs text-gray-500 mt-2">
         Ajouté le : {formatDate(book.createdAt)}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onView(book)}
            leftIcon={<Book size={16} />}
            className="flex-1"
          >
            Voir
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onEdit(book)}
            leftIcon={<Edit size={16} />}
            className="flex-1"
          >
            Modifier
          </Button>
          
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(book.id)}
            leftIcon={<Trash2 size={16} />}
            className="flex-none"
          >
            <span className="sr-only">Supprimer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;