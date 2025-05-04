import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validation';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register, state } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include letters and numbers';
      valid = false;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(formData.username, formData.email, formData.password);
      if (onSuccess) onSuccess();
    } catch (error) {
      // Handle any unexpected errors
      console.error('Registration error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Choose a username"
        error={errors.username}
        fullWidth
        leftIcon={<User size={18} />}
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
        fullWidth
        leftIcon={<Mail size={18} />}
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        helperText="Password must be at least 8 characters and include letters and numbers"
        error={errors.password}
        fullWidth
        leftIcon={<Lock size={18} />}
      />
      
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
        fullWidth
        leftIcon={<Lock size={18} />}
      />
      
      {state.error && (
        <div className="text-red-600 text-sm mt-2">{state.error}</div>
      )}
      
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={state.loading}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;