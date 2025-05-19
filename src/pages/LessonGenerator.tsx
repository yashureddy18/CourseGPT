import React, { useState } from 'react';
import LessonForm from '../components/lesson/LessonForm';
import LessonCard from '../components/lesson/LessonCard';
import LessonEditor from '../components/lesson/LessonEditor';
import Button from '../components/ui/Button';
import { Lesson } from '../types';
import { useCourse } from '../contexts/CourseContext';
import { Save, X } from 'lucide-react';

const LessonGenerator: React.FC = () => {
  const { addLesson } = useCourse();
  const [generatedLesson, setGeneratedLesson] = useState<Lesson | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLessonGenerated = (lesson: Lesson) => {
    setGeneratedLesson(lesson);
    setIsEditing(false);
    // Scroll to the preview
    setTimeout(() => {
      document.getElementById('lessonPreview')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleSaveLesson = (lesson: Lesson) => {
    addLesson(lesson);
    setGeneratedLesson(null);
    setIsEditing(false);
    // Show success message or redirect
  };
  
  const handleEditLesson = () => {
    setIsEditing(true);
    // Scroll to the editor
    setTimeout(() => {
      document.getElementById('lessonEditor')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setGeneratedLesson(updatedLesson);
    setIsEditing(false);
    // Scroll to the preview
    setTimeout(() => {
      document.getElementById('lessonPreview')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    // Scroll to the preview
    setTimeout(() => {
      document.getElementById('lessonPreview')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleDiscardLesson = () => {
    setGeneratedLesson(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lesson Generator</h1>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-blue-800 dark:text-blue-300 text-sm">
        <p>
          Use this tool to quickly generate comprehensive, structured lessons with AI assistance.
          Start by filling out the form below with your lesson topic and details.
        </p>
      </div>
      
      <LessonForm onLessonGenerated={handleLessonGenerated} />
      
      {generatedLesson && !isEditing && (
        <div id="lessonPreview" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lesson Preview</h2>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDiscardLesson}
                icon={<X size={16} />}
              >
                Discard
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEditLesson}
              >
                Edit
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => handleSaveLesson(generatedLesson)}
                icon={<Save size={16} />}
              >
                Save Lesson
              </Button>
            </div>
          </div>
          
          <LessonCard lesson={generatedLesson} isPreview />
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Outcomes</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {generatedLesson.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Key Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {generatedLesson.keyConcepts.map((concept, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {concept}
                </span>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Activities</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {generatedLesson.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">Examples</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {generatedLesson.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              variant="primary" 
              onClick={() => handleSaveLesson(generatedLesson)}
              icon={<Save size={18} />}
              size="lg"
            >
              Save Lesson
            </Button>
          </div>
        </div>
      )}
      
      {generatedLesson && isEditing && (
        <div id="lessonEditor">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Lesson</h2>
          <LessonEditor 
            lesson={generatedLesson} 
            onSave={handleUpdateLesson} 
            onCancel={handleCancelEdit}
          />
        </div>
      )}
    </div>
  );
};

export default LessonGenerator;