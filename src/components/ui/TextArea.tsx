import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const textAreaClass = `
    block px-4 py-2 w-full text-gray-900 bg-white border ${
      error ? 'border-red-500' : 'border-gray-300'
    } rounded-md focus:outline-none focus:ring-2 ${
      error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
    } focus:border-transparent
    dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
    transition-colors duration-200 resize-y min-h-[100px]
    ${className}
  `;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <textarea 
        className={textAreaClass}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;