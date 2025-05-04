import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '../types';
import { getStoredAuth, setStoredAuth, clearStoredAuth, getStoredUsers, setStoredUsers } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Action types
type AuthAction = 
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_REQUEST' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

// Create context
type AuthContextType = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on mount
  useEffect(() => {
    const authData = getStoredAuth();
    if (authData && authData.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: authData.user });
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getStoredUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Save auth state to localStorage
        setStoredAuth({ user });
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed. Please try again.' });
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_REQUEST' });
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getStoredUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        dispatch({ type: 'REGISTER_FAILURE', payload: 'Email is already registered' });
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: uuidv4(),
        username,
        email,
        password // In a real app, we would hash this
      };
      
      // Save new user
      const updatedUsers = [...users, newUser];
      setStoredUsers(updatedUsers);
      
      // Login the user
      setStoredAuth({ user: newUser });
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'Registration failed. Please try again.' });
    }
  };

  // Logout function
  const logout = () => {
    clearStoredAuth();
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    state,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};