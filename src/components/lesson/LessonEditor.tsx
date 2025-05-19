import React, { useState } from 'react';
import { Edit, Save, RotateCcw, PlayCircle } from 'lucide-react';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import Input from '../ui/Input';
import { Lesson } from '../../types';

interface LessonEditorProps {
  lesson: Lesson;
  onSave: (updatedLesson: Lesson) => void;
  onCancel: () => void;
}

type EditableSections = 'title' | 'description' | 'learningOutcomes' | 'keyConcepts' | 'activities' | 'examples';

interface EditingState {
  [key in EditableSections]?: boolean;
}

const LessonEditor: React.FC<LessonEditorProps> = ({ lesson, onSave, onCancel }) => {
  const [editedLesson, setEditedLesson] = useState<Lesson>({ ...lesson });
  const [editing, setEditing] = useState<EditingState>({});
  const [regenerating, setRegenerating] = useState<Record<string, boolean>>({});

  const handleEdit = (section: EditableSections) => {
    setEditing(prev => ({ ...prev, [section]: true }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedLesson(prev => ({ ...prev, [name]: value }));
  };

  const handleListChange = (section: 'learningOutcomes' | 'keyConcepts' | 'activities' | 'examples', index: number, value: string) => {
    setEditedLesson(prev => {
      const newList = [...prev[section]];
      newList[index] = value;
      return { ...prev, [section]: newList };
    });
  };

  const handleAddListItem = (section: 'learningOutcomes' | 'keyConcepts' | 'activities' | 'examples') => {
    setEditedLesson(prev => {
      const newList = [...prev[section], ''];
      return { ...prev, [section]: newList };
    });
  };

  const handleRemoveListItem = (section: 'learningOutcomes' | 'keyConcepts' | 'activities' | 'examples', index: number) => {
    setEditedLesson(prev => {
      const newList = prev[section].filter((_, i) => i !== index);
      return { ...prev, [section]: newList };
    });
  };

  const handleRegenerateSection = async (section: string) => {
    // This would call an API to regenerate content in a real app
    setRegenerating({ ...regenerating, [section]: true });
    
    // Simulate API delay
    setTimeout(() => {
      let newContent;
      
      switch (section) {
        case 'title':
          newContent = `Improved: ${lesson.title}`;
          setEditedLesson(prev => ({ ...prev, title: newContent }));
          break;
        case 'description':
          newContent = `Enhanced version: ${lesson.description}`;
          setEditedLesson(prev => ({ ...prev, description: newContent }));
          break;
        case 'learningOutcomes':
          newContent = lesson.learningOutcomes.map(outcome => `Refined: ${outcome}`);
          setEditedLesson(prev => ({ ...prev, learningOutcomes: newContent }));
          break;
        default:
          break;
      }
      
      setRegenerating({ ...regenerating, [section]: false });
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 transition-all duration-200">
      <div className="space-y-6">
        {/* Title Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Title</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRegenerateSection('title')}
                icon={<RotateCcw size={16} />}
                isLoading={regenerating.title}
                disabled={regenerating.title}
                className="text-blue-600 dark:text-blue-400"
              >
                Regenerate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit('title')}
                icon={<Edit size={16} />}
                className="text-gray-700 dark:text-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
          
          {editing.title ? (
            <Input
              name="title"
              value={editedLesson.title}
              onChange={handleInputChange}
              fullWidth
            />
          ) : (
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{editedLesson.title}</h2>
          )}
        </div>
        
        {/* Description Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRegenerateSection('description')}
                icon={<RotateCcw size={16} />}
                isLoading={regenerating.description}
                disabled={regenerating.description}
                className="text-blue-600 dark:text-blue-400"
              >
                Regenerate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit('description')}
                icon={<Edit size={16} />}
                className="text-gray-700 dark:text-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
          
          {editing.description ? (
            <TextArea
              name="description"
              value={editedLesson.description}
              onChange={handleInputChange}
              fullWidth
            />
          ) : (
            <p className="text-gray-700 dark:text-gray-300">{editedLesson.description}</p>
          )}
        </div>
        
        {/* Learning Outcomes Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Learning Outcomes</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRegenerateSection('learningOutcomes')}
                icon={<RotateCcw size={16} />}
                isLoading={regenerating.learningOutcomes}
                disabled={regenerating.learningOutcomes}
                className="text-blue-600 dark:text-blue-400"
              >
                Regenerate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit('learningOutcomes')}
                icon={<Edit size={16} />}
                className="text-gray-700 dark:text-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
          
          {editing.learningOutcomes ? (
            <div className="space-y-2">
              {editedLesson.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center">
                  <Input
                    value={outcome}
                    onChange={(e) => handleListChange('learningOutcomes', index, e.target.value)}
                    fullWidth
                    className="mr-2"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveListItem('learningOutcomes', index)}
                    aria-label="Remove learning outcome"
                    className="text-red-500"
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddListItem('learningOutcomes')}
                fullWidth
              >
                Add Learning Outcome
              </Button>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {editedLesson.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Key Concepts Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Concepts</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRegenerateSection('keyConcepts')}
                icon={<RotateCcw size={16} />}
                isLoading={regenerating.keyConcepts}
                disabled={regenerating.keyConcepts}
                className="text-blue-600 dark:text-blue-400"
              >
                Regenerate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit('keyConcepts')}
                icon={<Edit size={16} />}
                className="text-gray-700 dark:text-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
          
          {editing.keyConcepts ? (
            <div className="space-y-2">
              {editedLesson.keyConcepts.map((concept, index) => (
                <div key={index} className="flex items-center">
                  <Input
                    value={concept}
                    onChange={(e) => handleListChange('keyConcepts', index, e.target.value)}
                    fullWidth
                    className="mr-2"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveListItem('keyConcepts', index)}
                    aria-label="Remove key concept"
                    className="text-red-500"
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddListItem('keyConcepts')}
                fullWidth
              >
                Add Key Concept
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {editedLesson.keyConcepts.map((concept, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                >
                  {concept}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Activities Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activities</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRegenerateSection('activities')}
                icon={<RotateCcw size={16} />}
                isLoading={regenerating.activities}
                disabled={regenerating.activities}
                className="text-blue-600 dark:text-blue-400"
              >
                Regenerate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit('activities')}
                icon={<Edit size={16} />}
                className="text-gray-700 dark:text-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
          
          {editing.activities ? (
            <div className="space-y-2">
              {editedLesson.activities.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <TextArea
                    value={activity}
                    onChange={(e) => handleListChange('activities', index, e.target.value)}
                    fullWidth
                    className="mr-2"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveListItem('activities', index)}
                    aria-label="Remove activity"
                    className="text-red-500"
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddListItem('activities')}
                fullWidth
              >
                Add Activity
              </Button>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {editedLesson.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Examples Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Examples</h3>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRegenerateSection('examples')}
                icon={<RotateCcw size={16} />}
                isLoading={regenerating.examples}
                disabled={regenerating.examples}
                className="text-blue-600 dark:text-blue-400"
              >
                Regenerate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleEdit('examples')}
                icon={<Edit size={16} />}
                className="text-gray-700 dark:text-gray-300"
              >
                Edit
              </Button>
            </div>
          </div>
          
          {editing.examples ? (
            <div className="space-y-2">
              {editedLesson.examples.map((example, index) => (
                <div key={index} className="flex items-center">
                  <TextArea
                    value={example}
                    onChange={(e) => handleListChange('examples', index, e.target.value)}
                    fullWidth
                    className="mr-2"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveListItem('examples', index)}
                    aria-label="Remove example"
                    className="text-red-500"
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddListItem('examples')}
                fullWidth
              >
                Add Example
              </Button>
            </div>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {editedLesson.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={() => onSave(editedLesson)}
          icon={<Save size={18} />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default LessonEditor;