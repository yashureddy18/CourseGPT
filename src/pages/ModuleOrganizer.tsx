import React, { useState } from 'react';
import { useCourse } from '../contexts/CourseContext';
import ModuleList from '../components/module/ModuleList';
import ModuleForm from '../components/module/ModuleForm';
import ModuleCard from '../components/module/ModuleCard';
import LessonCard from '../components/lesson/LessonCard';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { Module, Lesson } from '../types';
import { createModule } from '../utils/mockApi';
import { FolderKanban, FolderInput, ArrowLeft } from 'lucide-react';

const ModuleOrganizer: React.FC = () => {
  const { modules, lessons, addModule, updateModule, deleteModule, assignLessonToModule, removeLessonFromModule } = useCourse();
  
  const [isCreatingModule, setIsCreatingModule] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  
  // Get the current module if one is selected
  const currentModule = currentModuleId 
    ? modules.find(module => module.id === currentModuleId) 
    : null;
  
  // Get unassigned lessons
  const unassignedLessons = lessons.filter(lesson => !lesson.moduleId);
  
  const handleCreateModule = () => {
    setIsCreatingModule(true);
    setIsEditingModule(false);
    setCurrentModuleId(null);
  };
  
  const handleEditModule = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setIsEditingModule(true);
    setIsCreatingModule(false);
  };
  
  const handleDeleteModule = (moduleId: string) => {
    if (window.confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
      deleteModule(moduleId);
      if (currentModuleId === moduleId) {
        setCurrentModuleId(null);
        setIsEditingModule(false);
      }
    }
  };
  
  const handleSelectModule = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setIsEditingModule(false);
    setIsCreatingModule(false);
  };
  
  const handleModuleCreated = async (module: Module) => {
    try {
      // In a real app, we would make an API call
      const newModule = isEditingModule 
        ? module // Use the module as is when editing
        : await createModule(module);
      
      if (isEditingModule) {
        updateModule(module);
      } else {
        addModule(newModule);
      }
      
      setIsCreatingModule(false);
      setIsEditingModule(false);
      setCurrentModuleId(module.id);
    } catch (error) {
      console.error('Error creating/updating module:', error);
    }
  };
  
  const handleAssignLesson = () => {
    if (selectedLessonId && currentModuleId) {
      assignLessonToModule(selectedLessonId, currentModuleId);
      setSelectedLessonId('');
    }
  };
  
  const handleRemoveLessonFromModule = (lessonId: string) => {
    if (currentModuleId) {
      removeLessonFromModule(lessonId, currentModuleId);
    }
  };
  
  const handleBackToModules = () => {
    setCurrentModuleId(null);
    setIsCreatingModule(false);
    setIsEditingModule(false);
  };

  // Helper function to get lesson by ID
  const getLessonById = (id: string): Lesson | undefined => {
    return lessons.find(lesson => lesson.id === id);
  };

  return (
    <div className="space-y-8">
      {/* If creating/editing a module or viewing module details */}
      {(isCreatingModule || isEditingModule || currentModuleId) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToModules}
          className="mb-4"
          icon={<ArrowLeft size={16} />}
        >
          Back to Modules
        </Button>
      )}
      
      {/* Module creation form */}
      {isCreatingModule && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Module</h1>
          <ModuleForm 
            onModuleCreated={handleModuleCreated} 
          />
        </div>
      )}
      
      {/* Module editing form */}
      {isEditingModule && currentModule && (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Module</h1>
          <ModuleForm 
            onModuleCreated={handleModuleCreated} 
            initialData={currentModule}
            editMode={true}
          />
        </div>
      )}
      
      {/* Module detail view */}
      {currentModuleId && currentModule && !isEditingModule && !isCreatingModule && (
        <div className="space-y-6">
          <div className="flex items-center">
            <FolderKanban className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentModule.title}</h1>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{currentModule.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Difficulty</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentModule.difficultyLevel}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estimated Time</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentModule.estimatedTime} minutes
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Lessons</h3>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentModule.lessons.length} lessons
                </p>
              </div>
            </div>
            
            {currentModule.prerequisites.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {currentModule.prerequisites.map((prerequisite, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {prerequisite}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => handleEditModule(currentModule.id)}
              >
                Edit Module
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Module Lessons</h2>
              
              {unassignedLessons.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Select
                    options={[
                      { value: '', label: 'Select a lesson to add' },
                      ...unassignedLessons.map(lesson => ({
                        value: lesson.id,
                        label: lesson.title
                      }))
                    ]}
                    value={selectedLessonId}
                    onChange={setSelectedLessonId}
                  />
                  <Button 
                    variant="outline" 
                    disabled={!selectedLessonId}
                    onClick={handleAssignLesson}
                    icon={<FolderInput size={16} />}
                  >
                    Add Lesson
                  </Button>
                </div>
              )}
            </div>
            
            {currentModule.lessons.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center border border-dashed border-gray-300 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Lessons in This Module</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Add lessons to this module using the selector above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {currentModule.lessons.map(lesson => {
                  const fullLesson = getLessonById(lesson.id);
                  return fullLesson ? (
                    <LessonCard
                      key={lesson.id}
                      lesson={fullLesson}
                      onDelete={() => handleRemoveLessonFromModule(lesson.id)}
                    />
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Module list view */}
      {!isCreatingModule && !isEditingModule && !currentModuleId && (
        <ModuleList
          modules={modules}
          onCreateModule={handleCreateModule}
          onEditModule={handleEditModule}
          onDeleteModule={handleDeleteModule}
          onSelectModule={handleSelectModule}
        />
      )}
    </div>
  );
};

export default ModuleOrganizer;