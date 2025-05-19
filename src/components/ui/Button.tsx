import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm dark:bg-purple-500 dark:hover:bg-purple-600',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-3 gap-2',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const disabledClasses = disabled || isLoading 
    ? 'opacity-60 cursor-not-allowed pointer-events-none' 
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClasses}
        ${className}
      `}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !isLoading && <span className="mr-1">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;