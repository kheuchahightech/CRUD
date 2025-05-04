// User types
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In a real app, we'd never store plain text passwords
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Book types
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  category: string;
  isbn: string;
  publishedYear: number;
  userId: string; // To associate books with users
  createdAt: number;
  updatedAt: number;
}

export interface BookState {
  books: Book[];
  filteredBooks: Book[];
  currentBook: Book | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categoryFilter: string;
}