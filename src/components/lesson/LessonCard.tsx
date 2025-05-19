import React from 'react';
import { Book, Edit, Trash2, FolderSymlink } from 'lucide-react';
import Button from '../ui/Button';
import { Lesson } from '../../types';

interface LessonCardProps {
  lesson: Lesson;
  onEdit?: () => void;
  onDelete?: () => void;
  onAssignToModule?: () => void;
  isPreview?: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  onEdit, 
  onDelete, 
  onAssignToModule,
  isPreview = false
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Book className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{lesson.title}</h3>
          </div>
          
          {!isPreview && (
            <div className="flex space-x-2">
              {onEdit && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onEdit}
                  icon={<Edit size={16} />}
                  aria-label="Edit lesson"
                >
                  Edit
                </Button>
              )}
              
              {onAssignToModule && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onAssignToModule}
                  icon={<FolderSymlink size={16} />}
                  aria-label="Assign to module"
                >
                  Assign
                </Button>
              )}
              
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onDelete}
                  icon={<Trash2 size={16} />}
                  aria-label="Delete lesson"
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
        
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {lesson.description}
        </p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Learning Outcomes:</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
            {lesson.learningOutcomes.slice(0, 2).map((outcome, index) => (
              <li key={index} className="line-clamp-1">{outcome}</li>
            ))}
            {lesson.learningOutcomes.length > 2 && (
              <li className="text-blue-600 dark:text-blue-400">
                +{lesson.learningOutcomes.length - 2} more outcomes...
              </li>
            )}
          </ul>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Key Concepts:</h4>
          <div className="flex flex-wrap gap-2">
            {lesson.keyConcepts.slice(0, 3).map((concept, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
              >
                {concept}
              </span>
            ))}
            {lesson.keyConcepts.length > 3 && (
              <span className="text-blue-600 dark:text-blue-400 text-xs">
                +{lesson.keyConcepts.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;