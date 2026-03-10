import { useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { MaterialsInventoryPage, MaterialData } from "./MaterialsInventoryPage";

interface MyTasksPageProps {
  onBack: () => void;
}

export function MyTasksPage({ onBack }: MyTasksPageProps) {
  const [tasks, setTasks] = useState<MaterialData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPillCount, setEditPillCount] = useState(0);
  const [showInventory, setShowInventory] = useState(false);

  const handleAddTaskFromInventory = (taskData: MaterialData) => {
    setTasks([...tasks, taskData]);
  };

  const handleTaskClick = (index: number) => {
    setEditingIndex(index);
    setEditName(tasks[index].name);
    
   
    setEditPillCount(tasks[index].quantity);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editName.trim() && editPillCount > 0) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = {
        name: editName.trim(),
       
        quantity: editPillCount,
      };
      setTasks(updatedTasks);
    }
    setEditingIndex(null);
    setEditName("");
    
    setEditPillCount(0);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
   
    setEditPillCount(0);
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const formatTaskDisplay = (task: MaterialData) => {

    return `${task.name}  - ${task.quantity} pills`;
  };

  if (showInventory) {
    return (
      <MaterialsInventoryPage
        onBack={() => setShowInventory(false)}
        onAddMaterial={handleAddTaskFromInventory}
        existingMaterials={tasks}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6" style={{ backgroundColor: 'var(--background)' }}>
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-4 rounded-xl border-2 md:border-3 transition-colors"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
      >
        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="w-full max-w-lg px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl mb-8 text-center" style={{ color: 'var(--foreground)' }}>My Materials</h1>
        
        <div className="flex flex-col gap-4">
          {tasks.map((task, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3">
              {editingIndex === index ? (
                <div className="flex-1 flex flex-col gap-3">
                  <input
                    type="text"
                    value={editName}
                    placeholder="Task name"
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-4 text-base sm:text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    autoFocus
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    
                    
                      
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={editPillCount}
                    placeholder="Pills in repertoire"
                    onChange={(e) => setEditPillCount(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-4 text-base sm:text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-8 py-4 text-lg rounded-xl border-3 transition-colors"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ring)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-8 py-4 text-lg rounded-xl border-3 transition-colors"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleTaskClick(index)}
                    className="flex-1 px-4 py-4 text-base sm:text-lg rounded-xl border-3 transition-colors text-left"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
                  >
                    {formatTaskDisplay(task)}
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="w-full sm:w-auto p-4 rounded-xl border-3 transition-colors"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            onClick={() => setShowInventory(true)}
            className="w-full flex items-center justify-center gap-3 px-8 py-5 text-xl rounded-xl border-3 transition-colors mt-4"
            style={{ borderColor:  'var(--border)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ring)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
          >
            <Plus className="w-6 h-6" />
            Add Material
          </button>
        </div>
      </div>
    </div>
  );
}
