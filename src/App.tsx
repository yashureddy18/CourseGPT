import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CourseEditor from './pages/CourseEditor';
import CreateCourse from './pages/CreateCourse';
import Templates from './pages/Templates';
import Header from './components/Header';
import { ThemeProvider, useTheme } from './components/ThemeProvider';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />
                <Home />
              </>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <>
                <Header toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />
                <Dashboard />
              </>
            } 
          />
          <Route path="/course/:id/edit" element={<CourseEditor />} />
          <Route 
            path="/templates" 
            element={
              <>
                <Header toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />
                <Templates />
              </>
            } 
          />
          <Route path="/courses" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="*" 
            element={
              <>
                <Header toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="mb-6">The page you are looking for doesn't exist.</p>
                    <a 
                      href="/"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
              </>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;