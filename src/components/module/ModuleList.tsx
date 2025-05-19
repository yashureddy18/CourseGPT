import React from 'react';
import { FolderKanban, PlusCircle } from 'lucide-react';
import Button from '../ui/Button';
import ModuleCard from './ModuleCard';
import { Module } from '../../types';

interface ModuleListProps {
  modules: Module[];
  onCreateModule: () => void;
  onEditModule: (moduleId: string) => void;
  onDeleteModule: (moduleId: string) => void;
  onSelectModule: (moduleId: string) => void;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onCreateModule,
  onEditModule,
  onDeleteModule,
  onSelectModule
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FolderKanban className="h-6 w-6 text-purple-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Modules</h2>
        </div>
        
        <Button 
          variant="primary" 
          size="md" 
          onClick={onCreateModule}
          icon={<PlusCircle size={18} />}
        >
          Create Module
        </Button>
      </div>
      
      {modules.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center border border-dashed border-gray-300 dark:border-gray-700">
          <FolderKanban className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Modules Yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Start by creating your first module to organize your lessons.
          </p>
          <Button 
            variant="outline" 
            onClick={onCreateModule}
            icon={<PlusCircle size={18} />}
          >
            Create Your First Module
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map(module => (
            <ModuleCard
              key={module.id}
              module={module}
              onEdit={() => onEditModule(module.id)}
              onDelete={() => onDeleteModule(module.id)}
              onClick={() => onSelectModule(module.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleList;