export interface Course {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  createdAt: Date;
  updatedAt: Date;
  modules: Module[];
  coverImage?: string;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  content: ContentBlock[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'quiz' | 'code';
  content: string;
  order: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AIPrompt {
  type: 'generate' | 'enhance' | 'summarize' | 'simplify';
  content: string;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
}