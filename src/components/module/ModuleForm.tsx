import React, { useState } from 'react';
import { FolderKanban, BookCheck } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import { DifficultyLevel, Module } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface ModuleFormProps {
  onModuleCreated: (module: Module) => void;
  initialData?: Partial<Module>;
  editMode?: boolean;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ 
  onModuleCreated, 
  initialData = {}, 
  editMode = false 
}) => {
  const [moduleData, setModuleData] = useState<Partial<Module>>({
    title: initialData.title || '',
    description: initialData.description || '',
    prerequisites: initialData.prerequisites || [],
    difficultyLevel: initialData.difficultyLevel || 'Beginner',
    estimatedTime: initialData.estimatedTime || 60,
    lessons: initialData.lessons || []
  });
  
  const [prerequisite, setPrerequisite] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof Module, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setModuleData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof Module]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDifficultyChange = (value: string) => {
    setModuleData(prev => ({ ...prev, difficultyLevel: value as DifficultyLevel }));
  };

  const handleAddPrerequisite = () => {
    if (prerequisite.trim()) {
      setModuleData(prev => ({
        ...prev,
        prerequisites: [...(prev.prerequisites || []), prerequisite.trim()]
      }));
      setPrerequisite('');
    }
  };

  const handleRemovePrerequisite = (index: number) => {
    setModuleData(prev => ({
      ...prev,
      prerequisites: (prev.prerequisites || []).filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Module, string>> = {};
    
    if (!moduleData.title?.trim()) {
      newErrors.title = 'Module title is required';
    }
    
    if (!moduleData.description?.trim()) {
      newErrors.description = 'Module description is required';
    }
    
    if (!moduleData.estimatedTime || moduleData.estimatedTime <= 0) {
      newErrors.estimatedTime = 'Please provide a valid estimated time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const newModule: Module = {
      id: initialData.id || uuidv4(),
      title: moduleData.title!,
      description: moduleData.description!,
      prerequisites: moduleData.prerequisites || [],
      difficultyLevel: moduleData.difficultyLevel as DifficultyLevel,
      estimatedTime: Number(moduleData.estimatedTime),
      lessons: moduleData.lessons || [],
      createdAt: initialData.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    onModuleCreated(newModule);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200">
      <div className="flex items-center mb-6">
        <FolderKanban className="h-6 w-6 text-purple-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {editMode ? 'Edit Module' : 'Create Module'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Module Title"
          name="title"
          id="moduleTitle"
          placeholder="e.g., Introduction to Web Development"
          value={moduleData.title || ''}
          onChange={handleChange}
          error={errors.title}
          fullWidth
          className="mb-4"
        />
        
        <TextArea
          label="Module Description"
          name="description"
          id="moduleDescription"
          placeholder="Describe what this module covers..."
          value={moduleData.description || ''}
          onChange={handleChange}
          error={errors.description}
          helperText="Provide a clear summary of what students will learn in this module."
          fullWidth
          className="mb-4"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select
            label="Difficulty Level"
            name="difficultyLevel"
            id="difficultyLevel"
            options={[
              { value: 'Beginner', label: 'Beginner' },
              { value: 'Intermediate', label: 'Intermediate' },
              { value: 'Advanced', label: 'Advanced' }
            ]}
            value={moduleData.difficultyLevel}
            onChange={handleDifficultyChange}
            helperText="Select the appropriate difficulty level for your target audience."
            fullWidth
          />
          
          <Input
            label="Estimated Time (minutes)"
            name="estimatedTime"
            id="estimatedTime"
            type="number"
            min="1"
            placeholder="e.g., 60"
            value={moduleData.estimatedTime?.toString() || ''}
            onChange={handleChange}
            error={errors.estimatedTime}
            helperText="How long will it take to complete this module?"
            fullWidth
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prerequisites
          </label>
          
          <div className="flex mb-2">
            <Input
              name="newPrerequisite"
              placeholder="e.g., Basic HTML knowledge"
              value={prerequisite}
              onChange={(e) => setPrerequisite(e.target.value)}
              fullWidth
              className="mr-2"
            />
            <Button 
              type="button"
              variant="outline" 
              onClick={handleAddPrerequisite}
            >
              Add
            </Button>
          </div>
          
          {moduleData.prerequisites && moduleData.prerequisites.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Added prerequisites:</p>
              <div className="flex flex-wrap gap-2">
                {moduleData.prerequisites.map((prereq, index) => (
                  <div 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {prereq}
                    <button
                      type="button"
                      className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => handleRemovePrerequisite(index)}
                      aria-label={`Remove prerequisite ${prereq}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={<BookCheck size={18} />}
          >
            {editMode ? 'Save Module' : 'Create Module'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModuleForm;