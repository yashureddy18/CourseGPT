import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, Type, Image as ImageIcon, Code, FileText, CheckSquare } from 'lucide-react';
import { Button } from './ui/Button';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'code' | 'quiz' | 'file';
  content: string;
  metadata?: {
    altText?: string;
    language?: string;
    options?: string[];
    correctAnswer?: string;
  };
}

interface ContentEditorProps {
  initialContent?: ContentBlock[];
  onSave: (content: ContentBlock[]) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ initialContent = [], onSave }) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialContent);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      metadata: type === 'quiz' ? { options: [], correctAnswer: '' } : undefined
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock.id);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(block =>
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const regenerateBlock = async (id: string) => {
    setIsGenerating(true);
    const block = blocks.find(b => b.id === id);
    if (!block) return;

    // TODO: Integrate with AI API for content regeneration
    setTimeout(() => {
      updateBlock(id, {
        content: `AI-enhanced version of ${block.type} content`
      });
      setIsGenerating(false);
    }, 1500);
  };

  const renderBlockEditor = (block: ContentBlock) => {
    const isSelected = selectedBlock === block.id;

    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              className="w-full p-3 min-h-[100px] border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="Enter your content here..."
            />
            {isSelected && (
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => regenerateBlock(block.id)}
                  disabled={isGenerating}
                >
                  <Sparkles size={16} className="mr-1" />
                  Enhance
                </Button>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Enter image URL"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
            <input
              type="text"
              value={block.metadata?.altText || ''}
              onChange={(e) => updateBlock(block.id, { 
                metadata: { ...block.metadata, altText: e.target.value }
              })}
              placeholder="Alt text for accessibility"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
            {block.content && (
              <img
                src={block.content}
                alt={block.metadata?.altText || ''}
                className="max-h-48 object-contain"
              />
            )}
          </div>
        );

      case 'code':
        return (
          <div className="space-y-2">
            <select
              value={block.metadata?.language || 'javascript'}
              onChange={(e) => updateBlock(block.id, {
                metadata: { ...block.metadata, language: e.target.value }
              })}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              className="w-full p-3 min-h-[150px] font-mono border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="Enter your code here..."
            />
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Enter question"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
            <div className="space-y-2">
              {block.metadata?.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(block.metadata?.options || [])];
                      newOptions[index] = e.target.value;
                      updateBlock(block.id, {
                        metadata: { ...block.metadata, options: newOptions }
                      });
                    }}
                    className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newOptions = block.metadata?.options?.filter((_, i) => i !== index);
                      updateBlock(block.id, {
                        metadata: { ...block.metadata, options: newOptions }
                      });
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newOptions = [...(block.metadata?.options || []), ''];
                  updateBlock(block.id, {
                    metadata: { ...block.metadata, options: newOptions }
                  });
                }}
              >
                Add Option
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Content Editor</h2>
        <div className="flex-grow" />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addBlock('text')}
            className="flex items-center gap-1"
          >
            <Type size={16} />
            Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addBlock('image')}
            className="flex items-center gap-1"
          >
            <ImageIcon size={16} />
            Image
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addBlock('code')}
            className="flex items-center gap-1"
          >
            <Code size={16} />
            Code
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addBlock('quiz')}
            className="flex items-center gap-1"
          >
            <CheckSquare size={16} />
            Quiz
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`border border-gray-200 dark:border-gray-800 rounded-lg p-4 ${
              selectedBlock === block.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {block.type === 'text' && <Type size={16} />}
                {block.type === 'image' && <ImageIcon size={16} />}
                {block.type === 'code' && <Code size={16} />}
                {block.type === 'quiz' && <CheckSquare size={16} />}
                <span className="text-sm font-medium capitalize">{block.type}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBlock(block.id);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            {renderBlockEditor(block)}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={() => onSave(blocks)}
          className="flex items-center gap-2"
        >
          <FileText size={16} />
          Save Content
        </Button>
      </div>
    </div>
  );
};

export default ContentEditor;