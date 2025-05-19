import { Lesson, Module, LessonFormData, DifficultyLevel } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a lesson based on input data
export const generateLesson = async (formData: LessonFormData): Promise<Lesson> => {
  // Simulate API call delay
  await delay(1500);
  
  const { topic, conceptDescription, targetAudience } = formData;
  
  // Generate a lesson title based on the topic
  const lessonTitle = `Understanding ${topic}: Core Concepts and Applications`;
  
  // Generate a description based on the concept description
  const description = `This lesson explores ${topic} in depth, focusing on its fundamental principles and real-world applications. Designed for ${targetAudience}, this lesson provides a comprehensive understanding of how ${topic} works and why it matters.`;
  
  // Generate learning outcomes
  const learningOutcomes = [
    `Define ${topic} and explain its significance in the broader context`,
    `Identify and describe the key components of ${topic}`,
    `Apply the principles of ${topic} to solve practical problems`,
    `Analyze how ${topic} relates to real-world scenarios and applications`
  ];
  
  // Generate key concepts
  const keyConcepts = [
    `Fundamentals of ${topic}`,
    `Historical development of ${topic}`,
    `Practical applications of ${topic}`,
    `Current trends and future directions in ${topic}`
  ];
  
  // Generate activities
  const activities = [
    `Group discussion: Explore the implications of ${topic} in different contexts`,
    `Case study analysis: Examine how ${topic} is applied in real-world situations`,
    `Problem-solving exercise: Apply principles of ${topic} to resolve a specific challenge`,
    `Reflection activity: Consider how ${topic} connects to personal or professional experiences`
  ];
  
  // Generate examples
  const examples = [
    `Case example: How Company X leveraged ${topic} to innovate their approach`,
    `Historical example: The evolution of ${topic} over time and its impact`,
    `Comparative example: How ${topic} differs across various fields or industries`,
    `Practical example: Step-by-step application of ${topic} in a common scenario`
  ];
  
  return {
    id: uuidv4(),
    title: lessonTitle,
    description,
    learningOutcomes,
    keyConcepts,
    activities,
    examples,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Save a lesson to a module
export const saveLessonToModule = async (lesson: Lesson, moduleId: string): Promise<void> => {
  await delay(800);
  // In a real app, this would make an API call to save the lesson to the database
  console.log('Saving lesson to module:', moduleId, lesson);
};

// Get all modules
export const getModules = async (): Promise<Module[]> => {
  await delay(800);
  
  // Return mock modules
  return [
    {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
      lessons: [],
      prerequisites: [],
      difficultyLevel: 'Beginner',
      estimatedTime: 120,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Advanced React Techniques',
      description: 'Master advanced React concepts including hooks, context, and state management.',
      lessons: [],
      prerequisites: ['Basic React knowledge', 'JavaScript fundamentals'],
      difficultyLevel: 'Intermediate',
      estimatedTime: 180,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
};

// Create a new module
export const createModule = async (module: Omit<Module, 'id' | 'createdAt' | 'updatedAt'>): Promise<Module> => {
  await delay(1000);
  
  const newModule: Module = {
    ...module,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  return newModule;
};

// Generate module suggestions based on lessons
export const generateModuleSuggestions = async (lessons: Lesson[]): Promise<Partial<Module>[]> => {
  await delay(1200);
  
  if (lessons.length === 0) {
    return [];
  }
  
  // Extract keywords from lesson titles and descriptions
  const keywords = lessons.flatMap(lesson => 
    lesson.title.split(' ').concat(lesson.description.split(' '))
  );
  
  // Generate module suggestions (in a real app, this would use AI)
  return [
    {
      title: 'Fundamentals and Core Concepts',
      description: 'A collection of lessons covering the fundamental principles and core concepts.',
      difficultyLevel: 'Beginner' as DifficultyLevel,
      estimatedTime: lessons.length * 30
    },
    {
      title: 'Advanced Applications and Case Studies',
      description: 'Explore advanced applications and real-world case studies in depth.',
      difficultyLevel: 'Intermediate' as DifficultyLevel,
      estimatedTime: lessons.length * 45
    },
    {
      title: 'Comprehensive Deep Dive',
      description: 'A thorough exploration of all topics with theoretical and practical components.',
      difficultyLevel: 'Advanced' as DifficultyLevel,
      estimatedTime: lessons.length * 60
    }
  ];
};