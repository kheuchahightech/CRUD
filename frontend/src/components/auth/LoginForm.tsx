import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateEmail } from '../../utils/validation';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, state } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
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
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(formData.email, formData.password);
      if (onSuccess) onSuccess();
    } catch (error) {
      // Handle any unexpected errors
      console.error('Login error:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        placeholder="Enter your password"
        error={errors.password}
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
          Log In
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;