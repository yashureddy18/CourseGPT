import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lesson, Module, Course } from '../types';
import { getModules } from '../utils/mockApi';

interface CourseContextType {
  lessons: Lesson[];
  modules: Module[];
  currentCourse: Course | null;
  addLesson: (lesson: Lesson) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (lessonId: string) => void;
  addModule: (module: Module) => void;
  updateModule: (module: Module) => void;
  deleteModule: (moduleId: string) => void;
  assignLessonToModule: (lessonId: string, moduleId: string) => void;
  removeLessonFromModule: (lessonId: string, moduleId: string) => void;
  loading: boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage or API
    const loadData = async () => {
      try {
        // In a real app, we would fetch from an API
        const savedLessons = localStorage.getItem('lessons');
        const fetchedModules = await getModules();
        
        if (savedLessons) {
          setLessons(JSON.parse(savedLessons));
        }
        
        setModules(fetchedModules);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Save lessons to localStorage whenever they change
  useEffect(() => {
    if (lessons.length > 0) {
      localStorage.setItem('lessons', JSON.stringify(lessons));
    }
  }, [lessons]);

  const addLesson = (lesson: Lesson) => {
    setLessons(prevLessons => [...prevLessons, lesson]);
  };

  const updateLesson = (updatedLesson: Lesson) => {
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    );
  };

  const deleteLesson = (lessonId: string) => {
    setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== lessonId));
    
    // Also remove the lesson from any module it's in
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
      }))
    );
  };

  const addModule = (module: Module) => {
    setModules(prevModules => [...prevModules, module]);
  };

  const updateModule = (updatedModule: Module) => {
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === updatedModule.id ? updatedModule : module
      )
    );
  };

  const deleteModule = (moduleId: string) => {
    setModules(prevModules => prevModules.filter(module => module.id !== moduleId));
    
    // Update any lessons that were in this module
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.moduleId === moduleId ? { ...lesson, moduleId: undefined } : lesson
      )
    );
  };

  const assignLessonToModule = (lessonId: string, moduleId: string) => {
    // Update the lesson
    const updatedLessons = lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, moduleId } : lesson
    );
    setLessons(updatedLessons);
    
    // Get the lesson to add to module
    const lessonToAdd = updatedLessons.find(lesson => lesson.id === lessonId);
    
    if (lessonToAdd) {
      // Update the module
      setModules(prevModules => 
        prevModules.map(module => 
          module.id === moduleId 
            ? { 
                ...module, 
                lessons: [...module.lessons.filter(l => l.id !== lessonId), lessonToAdd] 
              } 
            : module
        )
      );
    }
  };

  const removeLessonFromModule = (lessonId: string, moduleId: string) => {
    // Update the lesson
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === lessonId ? { ...lesson, moduleId: undefined } : lesson
      )
    );
    
    // Update the module
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              lessons: module.lessons.filter(lesson => lesson.id !== lessonId) 
            } 
          : module
      )
    );
  };

  const value = {
    lessons,
    modules,
    currentCourse,
    addLesson,
    updateLesson,
    deleteLesson,
    addModule,
    updateModule,
    deleteModule,
    assignLessonToModule,
    removeLessonFromModule,
    loading
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};