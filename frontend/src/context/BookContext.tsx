import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Book, BookState } from '../types';
import { getStoredBooks, setStoredBooks } from '../utils/localStorage';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';


const initialState: BookState = {
  books: [],
  filteredBooks: [],
  currentBook: null,
  loading: false,
  error: null,
  searchTerm: '',
  categoryFilter: ''
};


type BookAction = 
  | { type: 'FETCH_BOOKS_REQUEST' }
  | { type: 'FETCH_BOOKS_SUCCESS'; payload: Book[] }
  | { type: 'FETCH_BOOKS_FAILURE'; payload: string }
  | { type: 'SET_CURRENT_BOOK'; payload: Book | null }
  | { type: 'ADD_BOOK_REQUEST' }
  | { type: 'ADD_BOOK_SUCCESS'; payload: Book }
  | { type: 'ADD_BOOK_FAILURE'; payload: string }
  | { type: 'UPDATE_BOOK_REQUEST' }
  | { type: 'UPDATE_BOOK_SUCCESS'; payload: Book }
  | { type: 'UPDATE_BOOK_FAILURE'; payload: string }
  | { type: 'DELETE_BOOK_REQUEST' }
  | { type: 'DELETE_BOOK_SUCCESS'; payload: string }
  | { type: 'DELETE_BOOK_FAILURE'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: string }
  | { type: 'APPLY_FILTERS' };


const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
    case 'ADD_BOOK_REQUEST':
    case 'UPDATE_BOOK_REQUEST':
    case 'DELETE_BOOK_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        filteredBooks: action.payload,
        loading: false,
        error: null
      };
    case 'SET_CURRENT_BOOK':
      return {
        ...state,
        currentBook: action.payload
      };
    case 'ADD_BOOK_SUCCESS':
      return {
        ...state,
        books: [...state.books, action.payload],
        filteredBooks: [...state.books, action.payload],
        loading: false,
        error: null
      };
    case 'UPDATE_BOOK_SUCCESS':
      return {
        ...state,
        books: state.books.map(book => 
          book.id === action.payload.id ? action.payload : book
        ),
        filteredBooks: state.filteredBooks.map(book => 
          book.id === action.payload.id ? action.payload : book
        ),
        currentBook: action.payload,
        loading: false,
        error: null
      };
    case 'DELETE_BOOK_SUCCESS':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
        filteredBooks: state.filteredBooks.filter(book => book.id !== action.payload),
        currentBook: null,
        loading: false,
        error: null
      };
    case 'FETCH_BOOKS_FAILURE':
    case 'ADD_BOOK_FAILURE':
    case 'UPDATE_BOOK_FAILURE':
    case 'DELETE_BOOK_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    case 'SET_CATEGORY_FILTER':
      return {
        ...state,
        categoryFilter: action.payload
      };
    case 'APPLY_FILTERS':
      const { searchTerm, categoryFilter, books } = state;
      const filtered = books.filter(book => {
        const matchesSearch = 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerm.toLowerCase());
          
        const matchesCategory = categoryFilter === '' || book.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
      });
      
      return {
        ...state,
        filteredBooks: filtered
      };
    default:
      return state;
  }
};


type BookContextType = {
  state: BookState;
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBook: (book: Partial<Book> & { id: string }) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  setCurrentBook: (book: Book | null) => void;
  searchBooks: (term: string) => void;
  filterByCategory: (category: string) => void;
  getCategories: () => string[];
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const { state: authState } = useAuth();

  
  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchBooks();
    } else {
      
      dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: [] });
    }
  }, [authState.isAuthenticated]);

  
  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [state.searchTerm, state.categoryFilter]);

  
  const fetchBooks = async () => {
    if (!authState.user) return;
    
    dispatch({ type: 'FETCH_BOOKS_REQUEST' });
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allBooks = getStoredBooks();
      const userBooks = allBooks.filter(book => book.userId === authState.user?.id);
      
      dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: userBooks });
    } catch (error) {
      dispatch({ type: 'FETCH_BOOKS_FAILURE', payload: 'Failed to fetch books' });
    }
  };

  
  const addBook = async (bookData: Omit<Book, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!authState.user) return;
    
    dispatch({ type: 'ADD_BOOK_REQUEST' });
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const timestamp = Date.now();
      const newBook: Book = {
        ...bookData,
        id: uuidv4(),
        userId: authState.user.id,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      
      const allBooks = getStoredBooks();
      const updatedBooks = [...allBooks, newBook];
      
      setStoredBooks(updatedBooks);
      dispatch({ type: 'ADD_BOOK_SUCCESS', payload: newBook });
    } catch (error) {
      dispatch({ type: 'ADD_BOOK_FAILURE', payload: 'Failed to add book' });
    }
  };

  
  const updateBook = async (bookData: Partial<Book> & { id: string }) => {
    if (!authState.user) return;
    
    dispatch({ type: 'UPDATE_BOOK_REQUEST' });
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allBooks = getStoredBooks();
      const bookIndex = allBooks.findIndex(book => book.id === bookData.id);
      
      if (bookIndex === -1) {
        throw new Error('Book not found');
      }
      
      
      if (allBooks[bookIndex].userId !== authState.user.id) {
        throw new Error('Unauthorized to update this book');
      }
      
      const updatedBook = {
        ...allBooks[bookIndex],
        ...bookData,
        updatedAt: Date.now()
      };
      
      allBooks[bookIndex] = updatedBook;
      setStoredBooks(allBooks);
      
      dispatch({ type: 'UPDATE_BOOK_SUCCESS', payload: updatedBook });
    } catch (error) {
      dispatch({ 
        type: 'UPDATE_BOOK_FAILURE', 
        payload: error instanceof Error ? error.message : 'Failed to update book'
      });
    }
  };

  
  const deleteBook = async (id: string) => {
    if (!authState.user) return;
    
    dispatch({ type: 'DELETE_BOOK_REQUEST' });
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const allBooks = getStoredBooks();
      const bookToDelete = allBooks.find(book => book.id === id);
      
      if (!bookToDelete) {
        throw new Error('Book not found');
      }
      
      
      if (bookToDelete.userId !== authState.user.id) {
        throw new Error('Unauthorized to delete this book');
      }
      
      const updatedBooks = allBooks.filter(book => book.id !== id);
      setStoredBooks(updatedBooks);
      
      dispatch({ type: 'DELETE_BOOK_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ 
        type: 'DELETE_BOOK_FAILURE', 
        payload: error instanceof Error ? error.message : 'Failed to delete book'
      });
    }
  };

  
  const setCurrentBook = (book: Book | null) => {
    dispatch({ type: 'SET_CURRENT_BOOK', payload: book });
  };

  
  const searchBooks = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  
  const filterByCategory = (category: string) => {
    dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
  };

  
  const getCategories = (): string[] => {
    const categories = new Set(state.books.map(book => book.category));
    return Array.from(categories);
  };

  const value = {
    state,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    setCurrentBook,
    searchBooks,
    filterByCategory,
    getCategories
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};


export const useBooks = () => {
  const context = useContext(BookContext);
  
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  
  return context;
};