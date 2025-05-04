import React, { useState, useEffect } from 'react';
import {  Save, X } from 'lucide-react';
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

const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Mystère',
  'Science-Fiction',
  'Fantaisie',
  'Romance',
  'Thriller',
  'Biographie',
  'Histoire',
  'Développement personnel',
  'Business',
  'Autre'
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
    
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!validateRequired(formData.title)) {
      newErrors.title = 'Le titre est requis';
      valid = false;
    }
    
    if (!validateRequired(formData.author)) {
      newErrors.author = "L'auteur est requis";
      valid = false;
    }
    
    if (!validateRequired(formData.description)) {
      newErrors.description = 'La description est requise';
      valid = false;
    }
    
    if (!validateRequired(formData.category)) {
      newErrors.category = 'La catégorie est requise';
      valid = false;
    }
    
    if (formData.isbn && !validateISBN(formData.isbn)) {
      newErrors.isbn = "L'ISBN doit être un numéro valide de 10 ou 13 chiffres";
      valid = false;
    }
    
    if (!validateYear(formData.publishedYear)) {
      newErrors.publishedYear = "L'année de publication ne peut pas être dans le futur";
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
      console.error('Erreur lors de la soumission du livre :', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Input
            label="Titre"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titre du livre"
            error={errors.title}
            fullWidth
          />
        </div>
        
        <Input
          label="Auteur"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Nom de l'auteur"
          error={errors.author}
          fullWidth
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Sélectionner une catégorie</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        
        <Input
          label="URL de l'image de couverture"
          type="url"
          name="cover"
          value={formData.cover}
          onChange={handleChange}
          placeholder="https://exemple.com/cover.jpg"
          error={errors.cover}
          helperText="Laissez vide pour une image par défaut"
          fullWidth
        />
        
        <Input
          label="ISBN"
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN (10 ou 13 chiffres)"
          error={errors.isbn}
          fullWidth
        />
        
        <Input
          label="Année de publication"
          type="number"
          name="publishedYear"
          value={formData.publishedYear.toString()}
          onChange={handleChange}
          placeholder="Année de publication"
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
            placeholder="Description du livre"
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
          Annuler
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          leftIcon={<Save size={18} />}
        >
          {book ? 'Mettre à jour le livre' : 'Ajouter le livre'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;