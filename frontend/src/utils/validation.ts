// Validation helpers for forms

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, containing at least 1 letter and 1 number
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

export const validateUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateISBN = (isbn: string): boolean => {
  // Basic ISBN validation - could be more sophisticated in a real app
  const cleanedISBN = isbn.replace(/-/g, '');
  return /^\d{10}$|^\d{13}$/.test(cleanedISBN);
};

export const validateYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year > 0 && year <= currentYear;
};