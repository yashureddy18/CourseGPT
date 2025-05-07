import React, { useState } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import AIAssistPanel from '../components/AIAssistPanel';
import { Link } from 'react-router-dom';

const CourseEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'outline' | 'settings'>('content');
  const [showAIPanel, setShowAIPanel] = useState<boolean>(true);
  const [expandedModule, setExpandedModule] = useState<string | null>('module1');
  
  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Introduction to Machine Learning
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last saved: 2 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="flex items-center gap-1"
              >
                <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                AI Assistant
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-1"
              >
                <Save size={16} />
                Save
              </Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1 mt-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'content'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-t border-l border-r border-gray-200 dark:border-gray-700'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('outline')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'outline'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-t border-l border-r border-gray-200 dark:border-gray-700'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Outline
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-t border-l border-r border-gray-200 dark:border-gray-700'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Content Editor */}
          <div className="w-full lg:w-2/3">
            {activeTab === 'content' && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Module: Fundamentals of Machine Learning</h2>
                
                {/* Content Blocks */}
                <div className="space-y-6">
                  {/* Text Block */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Text Block</h3>
                      <button className="text-red-500 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <textarea
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-32 resize-none"
                      defaultValue="Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data. This module covers the fundamental concepts, algorithms, and applications of machine learning."
                    />
                  </div>
                  
                  {/* Image Block */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Image Block</h3>
                      <button className="text-red-500 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
                      <img 
                        src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Machine Learning Concept" 
                        className="max-w-full max-h-64 object-contain mb-2"
                      />
                      <div className="flex items-center mt-2 w-full">
                        <input
                          type="text"
                          placeholder="Image URL"
                          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          defaultValue="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        />
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                          Update
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Alt text (description for accessibility)"
                        className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                        defaultValue="Machine Learning Concept Visualization"
                      />
                    </div>
                  </div>
                  
                  {/* Add New Block Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Content Block
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'outline' && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Course Outline</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Organize your course structure by creating modules and rearranging content.
                </p>
                
                <div className="space-y-4">
                  {/* Module 1 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <button
                      className="w-full bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between"
                      onClick={() => toggleModule('module1')}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Module 1: Fundamentals of Machine Learning</span>
                      </div>
                      {expandedModule === 'module1' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    
                    {expandedModule === 'module1' && (
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                          <span>Text: Introduction to Machine Learning</span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                          <span>Image: Machine Learning Concepts</span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 w-full justify-center"
                        >
                          <Plus size={16} />
                          Add Content
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Module 2 */}
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <button
                      className="w-full bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between"
                      onClick={() => toggleModule('module2')}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">Module 2: Supervised Learning</span>
                      </div>
                      {expandedModule === 'module2' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    
                    {expandedModule === 'module2' && (
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                          <span>Text: Introduction to Supervised Learning</span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 w-full justify-center"
                        >
                          <Plus size={16} />
                          Add Content
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Add New Module Button */}
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 w-full justify-center"
                  >
                    <Plus size={16} />
                    Add New Module
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Course Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Course Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      defaultValue="Introduction to Machine Learning"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Course Description
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 h-24 resize-none"
                      defaultValue="A comprehensive introduction to machine learning concepts and applications."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      defaultValue="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Course Objectives
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          defaultValue="Understand basic ML concepts"
                        />
                        <button className="text-red-500 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          defaultValue="Implement simple algorithms"
                        />
                        <button className="text-red-500 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          defaultValue="Evaluate model performance"
                        />
                        <button className="text-red-500 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          defaultValue="Apply ML to real-world problems"
                        />
                        <button className="text-red-500 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 w-full justify-center"
                      >
                        <Plus size={16} />
                        Add Objective
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* AI Assistant Panel (Sidebar) */}
          {showAIPanel && (
            <div className="w-full lg:w-1/3">
              <AIAssistPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseEditor;