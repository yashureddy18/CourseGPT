import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonGenerator, { GeneratedLesson } from '../components/LessonGenerator';
import ModuleOrganizer from '../components/ModuleOrganizer';
import ContentEditor from '../components/ContentEditor';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';
import { Module, ContentBlock } from '../types';

interface ExtendedModule extends Module {
  prerequisites: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
}

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<ExtendedModule[]>([]);
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  const handleLessonGenerated = (lesson: GeneratedLesson) => {
    const newModule: ExtendedModule = {
      id: `module-${Date.now()}`,
      title: lesson.title,
      prerequisites: [],
      difficulty: 'intermediate',
      estimatedTime: 60,
      order: modules.length,
      content: [
        // Using ContentBlock type for content items
        {
          id: `block-${Date.now()}-1`,
          type: 'text' as const,
          content: lesson.description
        },
        {
          id: `block-${Date.now()}-2`,
          type: 'text' as const,
          content: 'Learning Outcomes:\n' + lesson.learningOutcomes.join('\n')
        },
        {
          id: `block-${Date.now()}-3`,
          type: 'text' as const,
          content: 'Key Concepts:\n' + lesson.keyConcepts.join('\n')
        }
      ]
    };

    setModules([...modules, newModule]);
    setCurrentModule(newModule.id);
  };

  const handleModulesUpdate = (updatedModules: ExtendedModule[]) => {
    setModules(updatedModules);
  };

  const handleContentSave = (moduleId: string, content: ContentBlock[]) => {
    setModules(modules.map(module =>
      module.id === moduleId ? { ...module, content } : module
    ));
  };

  const handleSaveCourse = () => {
    // TODO: Implement course saving logic
    console.log('Saving course:', { modules });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="text-xl font-bold">Create New Course</h1>
            </div>
            <Button
              variant="primary"
              onClick={handleSaveCourse}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save Course
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lesson Generator */}
          <div className="lg:col-span-1">
            <LessonGenerator onGenerate={handleLessonGenerated} />
          </div>

          {/* Middle Column - Module Organizer */}
          <div className="lg:col-span-1">
            <ModuleOrganizer
              modules={modules}
              onModulesUpdate={handleModulesUpdate}
            />
          </div>

          {/* Right Column - Content Editor */}
          <div className="lg:col-span-1">
            {currentModule && (
              <ContentEditor
                initialContent={modules.find(m => m.id === currentModule)?.content}
                onSave={(content) => handleContentSave(currentModule, content)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;