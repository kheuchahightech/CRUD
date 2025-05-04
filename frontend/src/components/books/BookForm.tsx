import React, { useState, useEffect } from 'react';
import { Book, Save, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Book as BookType } from '../../types';
import { validateRequired, validateISBN, validateYear } from '../../utils/validation';

interface BookFormProps {
  book?: BookType | null;
  onSubmit: (bookData: Omit<BookType, 'id' | 'userId' | 'createdAt' | 'updatedAt'> | (Partial<BookType> & { id: string })) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

// Book categories
const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Other'
];

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    cover: '',
    description: '',
    category: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
  });
  
  const [errors, setErrors] = useState({
    title: '',
    author: '',
    cover: '',
    description: '',
    category: '',
    isbn: '',
    publishedYear: ''
  });
  
  // Set initial form data if editing a book
  useEffect(() => {
    if (book) {
      setFormData({
        id: book.id,
        title: book.title,
        author: book.author,
        cover: book.cover,
        description: book.description,
        category: book.category,
        isbn: book.isbn,
        publishedYear: book.publishedYear
      });
    }
  }, [book]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!validateRequired(formData.title)) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    
    if (!validateRequired(formData.author)) {
      newErrors.author = 'Author is required';
      valid = false;
    }
    
    if (!validateRequired(formData.description)) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    
    if (!validateRequired(formData.category)) {
      newErrors.category = 'Category is required';
      valid = false;
    }
    
    if (formData.isbn && !validateISBN(formData.isbn)) {
      newErrors.isbn = 'ISBN must be a valid 10 or 13 digit number';
      valid = false;
    }
    
    if (!validateYear(formData.publishedYear)) {
      newErrors.publishedYear = 'Published year cannot be in the future';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (book) {
        // Editing existing book
        await onSubmit({
          id: formData.id,
          title: formData.title,
          author: formData.author,
          cover: formData.cover,
          description: formData.description,
          category: formData.category,
          isbn: formData.isbn,
          publishedYear: formData.publishedYear
        });
      } else {
        // Adding new book
        await onSubmit({
          title: formData.title,
          author: formData.author,
          cover: formData.cover,
          description: formData.description,
          category: formData.category,
          isbn: formData.isbn,
          publishedYear: formData.publishedYear
        });
      }
    } catch (error) {
      console.error('Error submitting book:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Input
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
            error={errors.title}
            fullWidth
          />
        </div>
        
        <Input
          label="Author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author name"
          error={errors.author}
          fullWidth
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        
        <Input
          label="Cover Image URL"
          type="url"
          name="cover"
          value={formData.cover}
          onChange={handleChange}
          placeholder="https://example.com/cover.jpg"
          error={errors.cover}
          helperText="Leave empty for a generated placeholder"
          fullWidth
        />
        
        <Input
          label="ISBN"
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN (10 or 13 digits)"
          error={errors.isbn}
          fullWidth
        />
        
        <Input
          label="Published Year"
          type="number"
          name="publishedYear"
          value={formData.publishedYear.toString()}
          onChange={handleChange}
          placeholder="Year of publication"
          error={errors.publishedYear}
          fullWidth
        />
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Book description"
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          leftIcon={<X size={18} />}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          leftIcon={<Save size={18} />}
        >
          {book ? 'Update Book' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;