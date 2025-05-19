import React from 'react';
import { Sun, Moon, BookOpen } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'CourseGPT' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            icon={theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;