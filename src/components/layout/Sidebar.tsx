import React from 'react';
import { LightbulbIcon, FolderKanban, Edit, BookOpen, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Lesson Generator', href: '/lesson-generator', icon: LightbulbIcon },
  { name: 'Module Organizer', href: '/module-organizer', icon: FolderKanban },
  { name: 'Content Editor', href: '/content-editor', icon: Edit },
];

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200 w-64 fixed left-0 top-0 z-20">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
        <span className="text-xl font-bold text-gray-900 dark:text-white">CourseGPT</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'}
                  transition-colors duration-200
                `}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Pro Tip</h3>
          <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">
            Use specific keywords in your lesson topics to get more detailed AI-generated content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;