import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from './ui/Card';
import { Button } from './ui/Button';
import { Edit, Eye, MoreHorizontal } from 'lucide-react';
import { Course } from '../types';
import { formatDate, truncateText } from '../utils/helpers';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card hover className="overflow-hidden flex flex-col h-full">
      {course.coverImage && (
        <div className="relative h-40 w-full overflow-hidden">
          <img 
            src={course.coverImage} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>
          {truncateText(course.description, 100)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-2 space-y-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Modules:</strong> {course.modules.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Last updated:</strong> {formatDate(course.updatedAt)}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Course Objectives:</h4>
            <ul className="text-sm list-disc pl-5 space-y-1">
              {course.objectives.slice(0, 2).map((objective, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300">
                  {truncateText(objective, 60)}
                </li>
              ))}
              {course.objectives.length > 2 && (
                <li className="text-gray-500 dark:text-gray-400 italic">
                  +{course.objectives.length - 2} more objectives
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Link to={`/course/${course.id}/edit`}>
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Edit size={16} />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </Link>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full p-2"
        >
          <MoreHorizontal size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;