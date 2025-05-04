import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    className = '', 
    ...props 
  }, ref) => {
    // Base styles
    const baseInputStyles = 'rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';
    
    // Error styles
    const errorStyles = error ? 'border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
    
    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';
    
    // Icon padding
    const leftPadding = leftIcon ? 'pl-10' : '';
    const rightPadding = rightIcon ? 'pr-10' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              ${baseInputStyles}
              ${errorStyles}
              ${widthStyle}
              ${leftPadding}
              ${rightPadding}
              ${className}
            `}
            aria-invalid={!!error}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;