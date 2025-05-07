import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Clock, BookOpen, BarChart, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';

interface Module {
  id: string;
  title: string;
  prerequisites: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  order: number;
}

interface ModuleOrganizerProps {
  modules: Module[];
  onModulesUpdate: (modules: Module[]) => void;
}

const ModuleOrganizer: React.FC<ModuleOrganizerProps> = ({ modules: initialModules, onModulesUpdate }) => {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedModules = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setModules(updatedModules);
    onModulesUpdate(updatedModules);
  };

  const addNewModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: 'New Module',
      prerequisites: [],
      difficulty: 'intermediate',
      estimatedTime: 60,
      order: modules.length
    };

    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
    onModulesUpdate(updatedModules);
    setEditingModuleId(newModule.id);
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    const updatedModules = modules.map(module =>
      module.id === moduleId ? { ...module, ...updates } : module
    );
    setModules(updatedModules);
    onModulesUpdate(updatedModules);
  };

  const deleteModule = (moduleId: string) => {
    const updatedModules = modules
      .filter(module => module.id !== moduleId)
      .map((module, index) => ({ ...module, order: index }));
    setModules(updatedModules);
    onModulesUpdate(updatedModules);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Module Organization</h2>
        <Button
          variant="outline"
          onClick={addNewModule}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Module
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {modules.map((module, index) => (
                <Draggable key={module.id} draggableId={module.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-2 cursor-move text-gray-400"
                        >
                          <GripVertical size={20} />
                        </div>

                        <div className="flex-grow">
                          {editingModuleId === module.id ? (
                            <div className="space-y-4">
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => updateModule(module.id, { title: e.target.value })}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Difficulty</label>
                                  <select
                                    value={module.difficulty}
                                    onChange={(e) => updateModule(module.id, {
                                      difficulty: e.target.value as Module['difficulty']
                                    })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                                  >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Estimated Time (minutes)</label>
                                  <input
                                    type="number"
                                    value={module.estimatedTime}
                                    onChange={(e) => updateModule(module.id, {
                                      estimatedTime: parseInt(e.target.value)
                                    })}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Prerequisites</label>
                                <select
                                  multiple
                                  value={module.prerequisites}
                                  onChange={(e) => updateModule(module.id, {
                                    prerequisites: Array.from(e.target.selectedOptions, option => option.value)
                                  })}
                                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded"
                                >
                                  {modules
                                    .filter(m => m.id !== module.id)
                                    .map(m => (
                                      <option key={m.id} value={m.id}>{m.title}</option>
                                    ))}
                                </select>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingModuleId(null)}
                              >
                                Done
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">{module.title}</h3>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingModuleId(module.id)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => deleteModule(module.id)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Clock size={16} />
                                  <span>{module.estimatedTime} mins</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <BarChart size={16} />
                                  <span className="capitalize">{module.difficulty}</span>
                                </div>
                                {module.prerequisites.length > 0 && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <BookOpen size={16} />
                                    <span>{module.prerequisites.length} prerequisites</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ModuleOrganizer;