import { useState } from "react";
import { ArrowLeft, Plus, X, Phone, MessageCircle } from "lucide-react";
import { DoctorChatPage } from "./DoctorChatPage";
import { ContractorInventoryPage } from "./ContractorInventoryPage";

interface MyDoctorsPageProps {
  onBack: () => void;
}

export function MyDoctorsPage({ onBack }: MyDoctorsPageProps) {
  const [contractors, setContractors] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [chattingWithDoctor, setChattingWithDoctor] = useState<string | null>(null);
  const [showInventory, setShowInventory] = useState(false);

  const handleAddContractorFromInventory = (contractorName: string) => {
    setContractors([...contractors, contractorName]);
  };

  const handleContractorClick = (index: number) => {
    setEditingIndex(index);
    setEditValue(contractors[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editValue.trim()) {
      const updatedContractors = [...contractors];
      updatedContractors[editingIndex] = editValue.trim();
      setContractors(updatedContractors);
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const handleDeleteContractor = (index: number) => {
    setContractors(contractors.filter((_, i) => i !== index));
  };

  if (chattingWithDoctor) {
    return (
      <DoctorChatPage
        onBack={() => setChattingWithDoctor(null)}
        doctorName={chattingWithDoctor}
      />
    );
  }

  if (showInventory) {
    return (
      <ContractorInventoryPage
        onBack={() => setShowInventory(false)}
        onAddContractor={handleAddContractorFromInventory}
        existingContractors={contractors}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6" style={{ backgroundColor: 'var(--background)' }}>
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-4 rounded-xl border-2 md:border-3 transition-colors"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
      >
        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="w-full max-w-lg px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl mb-8 text-center" style={{ color: 'var(--foreground)' }}>
          My Contractors
        </h1>

        <div className="flex flex-col gap-4">
          {contractors.map((contractor, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3">
              {editingIndex === index ? (
                <div className="flex-1 flex flex-col gap-3">
                  <input
                    type="text"
                    value={editValue}
                    placeholder="Contractor name"
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit();
                      if (e.key === "Escape") handleCancelEdit();
                    }}
                    className="w-full px-4 py-4 text-base sm:text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    autoFocus
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-8 py-4 text-lg rounded-xl border-3 transition-colors"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ring)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-8 py-4 text-lg rounded-xl border-3 transition-colors"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--card)',
                        color: 'var(--foreground)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleContractorClick(index)}
                    className="flex-1 px-4 py-4 text-base sm:text-lg rounded-xl border-3 transition-colors text-left"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                  >
                    {contractor}
                  </button>

                  <button
                    onClick={() => {/* Handle call */}}
                    className="w-full sm:w-auto p-4 rounded-xl border-3 transition-colors"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                  >
                    <Phone className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setChattingWithDoctor(contractors[index])}
                    className="w-full sm:w-auto p-4 rounded-xl border-3 transition-colors"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDeleteContractor(index)}
                    className="w-full sm:w-auto p-4 rounded-xl border-3 transition-colors"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            onClick={() => setShowInventory(true)}
            className="w-full flex items-center justify-center gap-3 px-8 py-5 text-xl rounded-xl border-3 transition-colors mt-4"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ring)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
          >
            <Plus className="w-6 h-6" />
            Add Contractor
          </button>
        </div>
      </div>
    </div>
  );
}
