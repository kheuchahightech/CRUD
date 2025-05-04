// Helper functions for working with localStorage

// Auth Storage
export const getStoredAuth = (): any => {
  const authData = localStorage.getItem('auth');
  return authData ? JSON.parse(authData) : null;
};

export const setStoredAuth = (authData: any): void => {
  localStorage.setItem('auth', JSON.stringify(authData));
};

export const clearStoredAuth = (): void => {
  localStorage.removeItem('auth');
};

// Users Storage
export const getStoredUsers = (): any[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const setStoredUsers = (users: any[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Books Storage
export const getStoredBooks = (): any[] => {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
};

export const setStoredBooks = (books: any[]): void => {
  localStorage.setItem('books', JSON.stringify(books));
};