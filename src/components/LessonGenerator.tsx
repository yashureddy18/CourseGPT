import React, { useState } from 'react';
import { Sparkles, Book, Target, List, Activity } from 'lucide-react';
import { Button } from './ui/Button';

interface LessonGeneratorProps {
  onGenerate: (lesson: GeneratedLesson) => void;
}

interface GeneratedLesson {
  title: string;
  description: string;
  learningOutcomes: string[];
  keyConcepts: string[];
  activities: string[];
}

const LessonGenerator: React.FC<LessonGeneratorProps> = ({ onGenerate }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Integrate with AI API
    const mockGeneratedLesson = {
      title: 'Understanding ' + topic,
      description: `A comprehensive lesson about ${topic} designed for ${difficulty} level learners.`,
      learningOutcomes: [
        `Understand the core concepts of ${topic}`,
        `Apply ${topic} principles in real-world scenarios`,
        'Analyze and evaluate related case studies'
      ],
      keyConcepts: [
        `${topic} fundamentals`,
        'Key terminology',
        'Practical applications'
      ],
      activities: [
        'Interactive discussion',
        'Hands-on practice',
        'Group project'
      ]
    };

    setTimeout(() => {
      setIsGenerating(false);
      onGenerate(mockGeneratedLesson);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-blue-600 dark:text-blue-400" size={24} />
        <h2 className="text-xl font-bold">AI Lesson Generator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Topic or Concept
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Machine Learning Basics"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Will Generate:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Book size={16} />
              <span>Compelling title & description</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Target size={16} />
              <span>Learning outcomes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <List size={16} />
              <span>Key concepts & terminology</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Activity size={16} />
              <span>Learning activities</span>
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGenerate}
          disabled={!topic || isGenerating}
        >
          <Sparkles size={16} />
          {isGenerating ? 'Generating...' : 'Generate Lesson'}
        </Button>
      </div>
    </div>
  );
};

export default LessonGenerator;