import React, { useState } from 'react';
import { Book as BookType } from '../../types';
import BookCard from './BookCard';
import { Search, Filter, X, Plus, Book } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import BookForm from './BookForm';
import BookDetails from './BookDetails';
import Spinner from '../ui/Spinner';
import { useBooks } from '../../context/BookContext';

const BookList: React.FC = () => {
  const { 
    state, 
    searchBooks, 
    filterByCategory, 
    addBook, 
    updateBook, 
    deleteBook, 
    setCurrentBook,
    getCategories
  } = useBooks();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  
  const categories = getCategories();
  
  // Handle book creation
  const handleAddBook = async (bookData: Omit<BookType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    await addBook(bookData);
    setIsAddModalOpen(false);
  };
  
  // Handle book update
  const handleEditBook = async (bookData: Partial<BookType> & { id: string }) => {
    await updateBook(bookData);
    setIsEditModalOpen(false);
  };
  
  // Handle book deletion
  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      await deleteBook(bookToDelete);
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };
  
  // View book details
  const handleViewBook = (book: BookType) => {
    setCurrentBook(book);
    setIsViewModalOpen(true);
  };
  
  // Edit a book
  const handleEditBookClick = (book: BookType) => {
    setCurrentBook(book);
    setIsEditModalOpen(true);
  };
  
  // Delete book confirmation
  const handleDeleteClick = (id: string) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchBooks(e.target.value);
  };
  
  // Category filter handler
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterByCategory(e.target.value);
  };
  
  // Clear filters
  const handleClearFilters = () => {
    searchBooks('');
    filterByCategory('');
  };
  
  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search books by title, author or description..."
              value={state.searchTerm}
              onChange={handleSearch}
              fullWidth
              leftIcon={<Search size={18} />}
            />
          </div>
          
          <div className="w-full md:w-48">
            <select
              value={state.categoryFilter}
              onChange={handleCategoryChange}
              className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2">
            {(state.searchTerm || state.categoryFilter) && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                leftIcon={<X size={18} />}
              >
                Clear
              </Button>
            )}
            
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus size={18} />}
            >
              Add Book
            </Button>
          </div>
        </div>
      </div>
      
      {/* Book list */}
      {state.loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : state.filteredBooks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Book size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No books found</h3>
          <p className="text-gray-500 mb-4">
            {state.books.length === 0 
              ? "You haven't added any books yet."
              : "No books match your search criteria."
            }
          </p>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            Add Your First Book
          </Button>
        </div>
      ) : (
        <>
          {/* Results summary */}
          <div className="text-sm text-gray-600 mb-4">
            Showing {state.filteredBooks.length} {state.filteredBooks.length === 1 ? 'book' : 'books'}
            {(state.searchTerm || state.categoryFilter) && ' matching your filters'}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {state.filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onView={handleViewBook}
                onEdit={handleEditBookClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Add book modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
        size="lg"
      >
        <BookForm
          onSubmit={handleAddBook}
          onCancel={() => setIsAddModalOpen(false)}
          loading={state.loading}
        />
      </Modal>
      
      {/* Edit book modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Book"
        size="lg"
      >
        <BookForm
          book={state.currentBook}
          onSubmit={handleEditBook}
          onCancel={() => setIsEditModalOpen(false)}
          loading={state.loading}
        />
      </Modal>
      
      {/* View book details modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={state.currentBook?.title || 'Book Details'}
        size="lg"
      >
        {state.currentBook && (
          <BookDetails 
            book={state.currentBook} 
            onEdit={() => {
              setIsViewModalOpen(false);
              setIsEditModalOpen(true);
            }} 
            onDelete={() => {
              setIsViewModalOpen(false);
              setBookToDelete(state.currentBook?.id);
              setIsDeleteModalOpen(true);
            }} 
          />
        )}
      </Modal>
      
      {/* Delete confirmation modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Book"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={state.loading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookList;