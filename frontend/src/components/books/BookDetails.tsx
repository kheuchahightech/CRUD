import React from 'react';
import { Book, Edit, Trash2, Calendar, Hash, BookOpen } from 'lucide-react';
import { Book as BookType } from '../../types';
import Button from '../ui/Button';

interface BookDetailsProps {
  book: BookType;
  onEdit: () => void;
  onDelete: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onEdit, onDelete }) => {
  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  // Get cover image with fallback
  const getCover = () => {
    if (book.cover && book.cover.startsWith('http')) {
      return book.cover;
    }
    // Fallback cover based on the first letter of book title
    const seed = book.title.charAt(0).toLowerCase();
    return `https://picsum.photos/seed/${seed}/600/800`;
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Book Cover */}
      <div className="w-full md:w-1/3">
        <div className="relative pb-[140%] rounded-lg overflow-hidden bg-gray-200 shadow-md">
          <img
            src={getCover()}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Actions */}
        <div className="mt-4 flex space-x-2">
          <Button
            variant="secondary"
            fullWidth
            leftIcon={<Edit size={18} />}
            onClick={onEdit}
          >
            Edit
          </Button>
          
          <Button
            variant="danger"
            fullWidth
            leftIcon={<Trash2 size={18} />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      
      {/* Book Details */}
      <div className="w-full md:w-2/3">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h1>
        
        <div className="text-lg text-gray-600 mb-4">
          by <span className="font-medium">{book.author}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
            {book.category}
          </span>
          
          {book.publishedYear && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full">
              <Calendar size={14} />
              {book.publishedYear}
            </span>
          )}
          
          {book.isbn && (
            <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
              <Hash size={14} />
              ISBN: {book.isbn}
            </span>
          )}
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <span>Added: {formatDate(book.createdAt)}</span>
            </div>
            {book.updatedAt !== book.createdAt && (
              <div>
                <span>Last updated: {formatDate(book.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;