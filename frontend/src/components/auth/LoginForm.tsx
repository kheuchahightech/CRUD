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
    motDePasse: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    motDePasse: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Effacer l'erreur lors de la saisie
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
      valid = false;
    }

    if (!formData.motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.motDePasse);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Erreur de connexion :', error);
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
        placeholder="Entrez votre email"
        error={errors.email}
        fullWidth
        leftIcon={<Mail size={18} />}
      />

      <Input
        label="Mot de passe"
        type="password"
        name="motDePasse"
        value={formData.motDePasse}
        onChange={handleChange}
        placeholder="Entrez votre mot de passe"
        error={errors.motDePasse}
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
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;