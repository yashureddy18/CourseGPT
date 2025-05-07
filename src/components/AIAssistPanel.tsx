import React, { useState } from 'react';
import { MessageSquare, Sparkles, Check, Copy, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';
import { mockAIResponses } from '../utils/mockData';
import { AIPrompt } from '../types';

interface AIAssistPanelProps {
  context?: string;
}

const AIAssistPanel: React.FC<AIAssistPanelProps> = ({ context = '' }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiMode, setAiMode] = useState<'generate' | 'enhance'>('generate');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const response = mockAIResponses[aiMode];
      setAiResponse(response.content);
      setSuggestions(response.suggestions || []);
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (!aiResponse) return;
    
    navigator.clipboard.writeText(aiResponse);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrompt('');
    setAiResponse(null);
    setSuggestions([]);
  };

  const toggleAIMode = () => {
    setAiMode(aiMode === 'generate' ? 'enhance' : 'generate');
    setAiResponse(null);
    setSuggestions([]);
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={18} />
            <h3 className="font-medium">AI Assistant</h3>
          </div>
          <div className="flex gap-2">
            <Button 
              size="xs" 
              variant={aiMode === 'generate' ? 'primary' : 'outline'}
              onClick={() => aiMode !== 'generate' && toggleAIMode()}
              className="px-3"
            >
              Generate
            </Button>
            <Button 
              size="xs" 
              variant={aiMode === 'enhance' ? 'primary' : 'outline'}
              onClick={() => aiMode !== 'enhance' && toggleAIMode()}
              className="px-3"
            >
              Enhance
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={aiMode === 'generate' 
                ? "Describe what content you want to generate..." 
                : "Paste the content you want to enhance..."}
              className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none transition-all"
            />
          </div>
          <div className="flex justify-between">
            <Button 
              type="submit" 
              disabled={!prompt.trim() || loading}
              className="flex items-center gap-1"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {aiMode === 'generate' ? 'Generate Content' : 'Enhance Content'}
                </>
              )}
            </Button>
            {aiResponse && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleReset}
                size="sm"
              >
                Clear
              </Button>
            )}
          </div>
        </form>
        
        {aiResponse && (
          <div className="mt-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md relative">
              <div className="absolute top-2 right-2">
                <Button 
                  size="xs" 
                  variant="ghost" 
                  onClick={handleCopy} 
                  className="h-7 w-7 p-0 flex items-center justify-center"
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                </Button>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 pr-8">
                {aiResponse}
              </p>
            </div>
            
            {suggestions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Suggestions:</h4>
                <ul className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index} 
                      className="text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md flex items-start gap-2"
                    >
                      <MessageSquare size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistPanel;