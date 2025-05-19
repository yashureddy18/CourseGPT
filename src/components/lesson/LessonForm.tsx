import React, { useState } from 'react';
import { LightbulbIcon, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import { LessonFormData } from '../../types';
import { generateLesson } from '../../utils/mockApi';

interface LessonFormProps {
  onLessonGenerated: (lesson: any) => void;
}

const audienceOptions = [
  { value: 'beginners', label: 'Beginners' },
  { value: 'intermediate', label: 'Intermediate Learners' },
  { value: 'advanced', label: 'Advanced Practitioners' },
  { value: 'professionals', label: 'Industry Professionals' },
  { value: 'students', label: 'Students' }
];

const LessonForm: React.FC<LessonFormProps> = ({ onLessonGenerated }) => {
  const [formData, setFormData] = useState<LessonFormData>({
    topic: '',
    conceptDescription: '',
    targetAudience: 'beginners',
    additionalNotes: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof LessonFormData, string>>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name as keyof LessonFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAudienceChange = (value: string) => {
    setFormData(prev => ({ ...prev, targetAudience: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LessonFormData, string>> = {};
    
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }
    
    if (!formData.conceptDescription.trim()) {
      newErrors.conceptDescription = 'Concept description is required';
    } else if (formData.conceptDescription.trim().length < 20) {
      newErrors.conceptDescription = 'Please provide a more detailed description (at least 20 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const generatedLesson = await generateLesson(formData);
      onLessonGenerated(generatedLesson);
    } catch (error) {
      console.error('Error generating lesson:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200">
      <div className="flex items-center mb-6">
        <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lesson Generator</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Lesson Topic"
          name="topic"
          id="topic"
          placeholder="e.g., Introduction to Machine Learning"
          value={formData.topic}
          onChange={handleChange}
          error={errors.topic}
          fullWidth
          className="mb-4"
        />
        
        <TextArea
          label="Concept Description"
          name="conceptDescription"
          id="conceptDescription"
          placeholder="Describe the main concept or idea you want to teach in this lesson..."
          value={formData.conceptDescription}
          onChange={handleChange}
          error={errors.conceptDescription}
          helperText="Provide details about what you want to cover in this lesson. The more specific you are, the better the AI can generate relevant content."
          fullWidth
          className="mb-4"
        />
        
        <Select
          label="Target Audience"
          name="targetAudience"
          id="targetAudience"
          options={audienceOptions}
          value={formData.targetAudience}
          onChange={handleAudienceChange}
          helperText="Select the primary audience for this lesson to customize the content appropriately."
          fullWidth
          className="mb-4"
        />
        
        <TextArea
          label="Additional Notes (Optional)"
          name="additionalNotes"
          id="additionalNotes"
          placeholder="Any specific requirements, tone preferences, or additional context..."
          value={formData.additionalNotes || ''}
          onChange={handleChange}
          helperText="Add any special instructions or context that might help the AI generate better content."
          fullWidth
          className="mb-6"
        />
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            isLoading={isGenerating}
            icon={<Sparkles size={18} />}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating Lesson...' : 'Generate Lesson Content'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;