import React, { useState } from 'react';
import { useCourse } from '../contexts/CourseContext';
import LessonCard from '../components/lesson/LessonCard';
import LessonEditor from '../components/lesson/LessonEditor';
import { Edit, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Lesson, Module } from '../types';

const ContentEditor: React.FC = () => {
  const { lessons, modules, updateLesson, deleteLesson } = useCourse();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  
  // Get the current lesson if one is selected
  const currentLesson = currentLessonId 
    ? lessons.find(lesson => lesson.id === currentLessonId) 
    : null;
  
  // Filter lessons based on search term
  const filteredLessons = lessons.filter(lesson => 
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group lessons by module
  const lessonsByModule: Record<string, Lesson[]> = filteredLessons.reduce((acc, lesson) => {
    const moduleId = lesson.moduleId || 'unassigned';
    if (!acc[moduleId]) {
      acc[moduleId] = [];
    }
    acc[moduleId].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleEditLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    // Scroll to editor
    setTimeout(() => {
      document.getElementById('lessonEditor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleDeleteLesson = (lessonId: string) => {
    if (window.confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
      deleteLesson(lessonId);
      if (currentLessonId === lessonId) {
        setCurrentLessonId(null);
      }
    }
  };
  
  const handleUpdateLesson = (updatedLesson: Lesson) => {
    updateLesson(updatedLesson);
    setCurrentLessonId(null);
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCancelEdit = () => {
    setCurrentLessonId(null);
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Helper function to get module by ID
  const getModuleById = (id: string): Module | undefined => {
    return modules.find(module => module.id === id);
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Editor</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search lessons by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Lesson list by module */}
      {!currentLesson && (
        <div className="space-y-8">
          {/* Unassigned lessons first */}
          {lessonsByModule['unassigned'] && lessonsByModule['unassigned'].length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Unassigned Lessons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonsByModule['unassigned'].map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onEdit={() => handleEditLesson(lesson.id)}
                    onDelete={() => handleDeleteLesson(lesson.id)}
                    onAssignToModule={() => {}} // This would open a module assignment modal in a full app
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Then lessons by module */}
          {Object.entries(lessonsByModule).map(([moduleId, moduleLessons]) => {
            if (moduleId === 'unassigned') return null;
            
            const module = getModuleById(moduleId);
            if (!module) return null;
            
            return (
              <div key={moduleId} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {module.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleLessons.map(lesson => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onEdit={() => handleEditLesson(lesson.id)}
                      onDelete={() => handleDeleteLesson(lesson.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* No lessons found message */}
          {filteredLessons.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center border border-dashed border-gray-300 dark:border-gray-700">
              <Edit className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Lessons Found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchTerm 
                  ? `No lessons matching "${searchTerm}" were found.` 
                  : "You haven't created any lessons yet."}
              </p>
              <Button 
                variant="primary" 
                as="a" 
                href="/lesson-generator"
              >
                Create a Lesson
              </Button>
            </div>
          )}
        </div>
      )}
      
      {/* Lesson editor */}
      {currentLesson && (
        <div id="lessonEditor" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Lesson</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
          
          <LessonEditor
            lesson={currentLesson}
            onSave={handleUpdateLesson}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default ContentEditor;