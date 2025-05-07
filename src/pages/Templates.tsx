import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowRight, BookOpen, Code, FlaskRound as Flask, Palette, Brain, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Templates: React.FC = () => {
  const templates = [
    {
      id: 'programming',
      title: 'Programming Course',
      description: 'Perfect for teaching coding concepts with interactive examples and exercises.',
      icon: Code,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: 'science',
      title: 'Science Course',
      description: 'Structured template for scientific concepts with experiments and observations.',
      icon: Flask,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30'
    },
    {
      id: 'art',
      title: 'Art & Design',
      description: 'Visual-focused template for teaching creative and design principles.',
      icon: Palette,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      id: 'psychology',
      title: 'Psychology',
      description: 'Template for teaching psychological concepts with case studies.',
      icon: Brain,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30'
    },
    {
      id: 'business',
      title: 'Business Skills',
      description: 'Professional template for business and management training.',
      icon: Briefcase,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30'
    },
    {
      id: 'blank',
      title: 'Blank Template',
      description: 'Start from scratch with a clean, customizable course structure.',
      icon: BookOpen,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Course Templates</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose from our professionally designed templates to kickstart your course creation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <Card key={template.id} hover className="group">
                <Link to={`/dashboard?template=${template.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-3 rounded-lg ${template.bgColor}`}>
                        <Icon className={`w-6 h-6 ${template.color}`} />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                      Use Template
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Templates;