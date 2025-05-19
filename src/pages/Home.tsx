import React from 'react';
import { BookOpen, LightbulbIcon, FolderKanban, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}> = ({ title, description, icon, to, color }) => (
  <Link
    to={to}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
  >
    <div className="p-6">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </div>
  </Link>
);

const Home: React.FC = () => {
  const { lessons, modules } = useCourse();

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Create Exceptional Educational Content with AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          CourseGPT helps educators and content creators develop structured, 
          engaging learning materials with intelligent assistance.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 dark:bg-blue-800 p-3">
                <LightbulbIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Lessons</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{lessons.length}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 dark:bg-purple-800 p-3">
                <FolderKanban className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Modules</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{modules.length}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-800 p-3">
                <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Content Created</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(lessons.length + modules.length) > 0 ? 
                    `${lessons.length + modules.length} Items` : 
                    'None Yet'}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Generate Lessons"
          description="Create comprehensive, structured lessons with AI assistance in minutes."
          icon={<LightbulbIcon className="h-6 w-6 text-white" />}
          to="/lesson-generator"
          color="bg-blue-600"
        />
        
        <FeatureCard
          title="Organize Modules"
          description="Group related lessons into cohesive modules with metadata management."
          icon={<FolderKanban className="h-6 w-6 text-white" />}
          to="/module-organizer"
          color="bg-purple-600"
        />
        
        <FeatureCard
          title="Edit Content"
          description="Refine AI-generated content with an intuitive editing interface."
          icon={<Edit className="h-6 w-6 text-white" />}
          to="/content-editor"
          color="bg-emerald-600"
        />
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to create amazing courses?</h3>
            <p className="text-blue-100 mb-4 md:mb-0">
              Start by generating your first lesson with powerful AI assistance.
            </p>
          </div>
          <Link
            to="/lesson-generator"
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md shadow-sm hover:bg-blue-50 transition-colors duration-200"
          >
            Create Your First Lesson
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;