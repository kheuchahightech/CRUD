import React, { useState } from 'react';
import { Book as BookType } from '../../types';
import BookCard from './BookCard';
import { Search, X, Plus, Book } from 'lucide-react';
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
  
  // Création d'un livre
  const handleAddBook = async (bookData: Omit<BookType, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    await addBook(bookData);
    setIsAddModalOpen(false);
  };
  
  // Modification d'un livre
  const handleEditBook = async (bookData: Partial<BookType> & { id: string }) => {
    await updateBook(bookData);
    setIsEditModalOpen(false);
  };
  
  // Suppression d'un livre
  const handleDeleteConfirm = async () => {
    if (bookToDelete) {
      await deleteBook(bookToDelete);
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };
  
  // Affichage des détails d'un livre
  const handleViewBook = (book: BookType) => {
    setCurrentBook(book);
    setIsViewModalOpen(true);
  };
  
  // Modifier un livre
  const handleEditBookClick = (book: BookType) => {
    setCurrentBook(book);
    setIsEditModalOpen(true);
  };
  
  // Confirmer la suppression d'un livre
  const handleDeleteClick = (id: string) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };
  
  // Gestion de la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchBooks(e.target.value);
  };
  
  // Gestion du filtre par catégorie
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterByCategory(e.target.value);
  };
  
  // Réinitialiser les filtres
  const handleClearFilters = () => {
    searchBooks('');
    filterByCategory('');
  };

  // Fonction générique pour gérer la soumission du formulaire
  const handleFormSubmit = (bookData: Omit<BookType, 'id' | 'userId' | 'createdAt' | 'updatedAt'> | (Partial<BookType> & { id: string })) => {
    if ('id' in bookData) {
      return handleEditBook(bookData as Partial<BookType> & { id: string });
    } else {
      return handleAddBook(bookData);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Recherche et filtres */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Rechercher des livres par titre, auteur ou description..."
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
              <option value="">Toutes les catégories</option>
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
                Effacer
              </Button>
            )}
            
            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus size={18} />}
            >
              Ajouter un livre
            </Button>
          </div>
        </div>
      </div>
      
      {/* Liste des livres */}
      {state.loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : state.filteredBooks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Book size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun livre trouvé</h3>
          <p className="text-gray-500 mb-4">
            {state.books.length === 0 
              ? "Vous n'avez ajouté aucun livre pour le moment."
              : "Aucun livre ne correspond à votre recherche."
            }
          </p>
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            Ajouter votre premier livre
          </Button>
        </div>
      ) : (
        <>
          {/* Résumé des résultats */}
          <div className="text-sm text-gray-600 mb-4">
            Affichage de {state.filteredBooks.length} {state.filteredBooks.length === 1 ? 'livre' : 'livres'}
            {(state.searchTerm || state.categoryFilter) && ' correspondant à vos filtres'}
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
      
      {/* Modal d'ajout de livre */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un nouveau livre"
        size="lg"
      >
        <BookForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsAddModalOpen(false)}
          loading={state.loading}
        />
      </Modal>
      
      {/* Modal de modification de livre */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Modifier un livre"
        size="lg"
      >
        <BookForm
          book={state.currentBook}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          loading={state.loading}
        />
      </Modal>
      
      {/* Modal de détails du livre */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={state.currentBook?.title || 'Détails du livre'}
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
              handleDeleteClick(state.currentBook.id);
            }} 
          />
        )}
      </Modal>
      
      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer un livre"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.
          </p>
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Annuler
            </Button>
            
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={state.loading}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookList;