export interface Lesson {
  id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  keyConcepts: string[];
  activities: string[];
  examples: string[];
  moduleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  prerequisites: string[];
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LessonFormData {
  topic: string;
  conceptDescription: string;
  targetAudience: string;
  additionalNotes?: string;
}