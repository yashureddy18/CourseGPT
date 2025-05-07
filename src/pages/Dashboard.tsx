import React from 'react';
import { PlusCircle, BookOpen, FileText, Award, ListFilter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import CourseCard from '../components/CourseCard';
import { mockCourses } from '../utils/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Continue creating amazing courses with AI assistance
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Create New Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Courses</p>
              <h3 className="text-2xl font-bold mt-1">{mockCourses.length}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-500">↑ 12%</span> from last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Modules</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <FileText className="text-teal-600 dark:text-teal-400" size={20} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-500">↑ 8%</span> from last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              <h3 className="text-2xl font-bold mt-1">7</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Award className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-amber-500">→ 0%</span> from last month
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Courses</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-1">
              <ListFilter size={16} />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;