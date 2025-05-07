import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Plus } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
          >
            <span className="text-xl font-bold">CourseGPT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/dashboard') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/courses') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              My Courses
            </Link>
            <Link
              to="/templates"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/templates') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Templates
            </Link>
            <Button
              variant="primary"
              size="sm"
              className="ml-4 flex items-center gap-1"
            >
              <Plus size={16} />
              New Course
            </Button>
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/dashboard"
              className={`block text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/dashboard') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/courses"
              className={`block text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/courses') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              My Courses
            </Link>
            <Link
              to="/templates"
              className={`block text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive('/templates') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Templates
            </Link>
            <Button
              variant="primary"
              size="sm"
              fullWidth
              className="flex items-center justify-center gap-1"
            >
              <Plus size={16} />
              New Course
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;