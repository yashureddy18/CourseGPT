import React from 'react';
import { FolderKanban, Clock, BarChart, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { Module } from '../../types';

interface ModuleCardProps {
  module: Module;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  onEdit, 
  onDelete,
  onClick
}) => {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`;
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <FolderKanban className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{module.title}</h3>
          </div>
          
          <div className="flex space-x-2">
            {onEdit && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                icon={<Edit size={16} />}
                aria-label="Edit module"
              >
                Edit
              </Button>
            )}
            
            {onDelete && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                icon={<Trash2 size={16} />}
                aria-label="Delete module"
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {module.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {formatTime(module.estimatedTime)}
            </span>
          </div>
          
          <div className="flex items-center">
            <BarChart className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[module.difficultyLevel]}`}>
              {module.difficultyLevel}
            </span>
          </div>
        </div>
        
        {module.lessons.length > 0 && (
          <div className="mt-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {module.lessons.length} {module.lessons.length === 1 ? 'Lesson' : 'Lessons'}
            </span>
          </div>
        )}
        
        {module.prerequisites.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Prerequisites:</h4>
            <div className="flex flex-wrap gap-1">
              {module.prerequisites.slice(0, 2).map((prerequisite, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                >
                  {prerequisite}
                </span>
              ))}
              {module.prerequisites.length > 2 && (
                <span className="text-blue-600 dark:text-blue-400 text-xs">
                  +{module.prerequisites.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;