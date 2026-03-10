import { useState } from "react";
import { ArrowLeft, Plus, Check, X } from "lucide-react";

interface MaterialsInventoryPageProps {
  onBack: () => void;
  onAddMaterial: (materialData: MaterialData) => void;
  existingMaterials: MaterialData[];
}

interface Material {
  name: string;
  category: string;
}

export interface MaterialData {
  name: string;
  quantity: number;
}

export function MaterialsInventoryPage({ onBack, onAddMaterial, existingMaterials }: MaterialsInventoryPageProps) {
  const [materials] = useState<Material[]>([
    { name: "2x4 Lumber (8 ft)", category: "Wood" },
    { name: "Plywood Sheet (4x8)", category: "Wood" },
    { name: "Drywall Panel (4x8)", category: "Wallboard" },
    { name: "Concrete Mix (80 lb)", category: "Concrete" },
    { name: "Rebar (1/2 in)", category: "Reinforcement" },
    { name: "Exterior Paint (1 gal)", category: "Coatings" },
    { name: "Roofing Shingles", category: "Roofing" },
    { name: "PVC Pipe (1 in)", category: "Plumbing" },
    { name: "Copper Wire (12 gauge)", category: "Electrical" },
    { name: "Insulation Batts (R-13)", category: "Insulation" },
    { name: "Deck Screws (2.5 in)", category: "Fasteners" },
    { name: "Construction Adhesive", category: "Adhesives" },
  ]);

  const [addedMaterials, setAddedMaterials] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [quantity, setQuantity] = useState(30);

  const handleAddMaterialClick = (materialName: string) => {
    setSelectedMaterial(materialName);
    setQuantity(30);
    setShowForm(true);
  };

  const handleSaveMaterial = () => {
    if (selectedMaterial && quantity > 0) {
      const materialData: MaterialData = {
        name: selectedMaterial,
        
        quantity,
      };
      onAddMaterial(materialData);
      setAddedMaterials([...addedMaterials, selectedMaterial]);
      setShowForm(false);
      setSelectedMaterial("");
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedMaterial("");
  };

  const isMaterialAdded = (materialName: string) => {
    return existingMaterials.some(m => m.name === materialName) || addedMaterials.includes(materialName);
  };

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      <div className="flex items-center justify-between p-8 border-b-3" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={onBack}
          className="p-5 rounded-xl border-3 transition-colors"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-4xl" style={{ color: 'var(--foreground)' }}>Materials Inventory</h1>
        <div className="w-[72px]"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {materials.map((material) => {
            const isAdded = isMaterialAdded(material.name);
            return (
              <div
                key={material.name}
                className="flex items-center justify-between p-6 rounded-xl border-3"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
              >
                <div>
                  <h3 className="text-2xl" style={{ color: 'var(--foreground)' }}>{material.name}</h3>
                  <p className="text-lg mt-1" style={{ color: 'var(--muted-foreground)' }}>{material.category}</p>
                </div>
                <button
                  onClick={() => handleAddMaterialClick(material.name)}
                  disabled={isAdded}
                  className="px-6 py-3 rounded-xl border-3 transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: isAdded ? 'var(--muted)' : 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    cursor: isAdded ? 'not-allowed' : 'pointer',
                    opacity: isAdded ? 0.8 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isAdded) e.currentTarget.style.backgroundColor = 'var(--ring)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isAdded) e.currentTarget.style.backgroundColor = 'var(--primary)';
                  }}
                >
                  {isAdded ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Material Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(31, 41, 55, 0.55)' }}>
          <div className="w-full max-w-md p-8 rounded-xl border-3 shadow-lg" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl" style={{ color: 'var(--foreground)' }}>Add Material</h2>
              <button
                onClick={handleCancelForm}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--foreground)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg mb-2" style={{ color: 'var(--foreground)' }}>Material</label>
                <div className="px-4 py-3 rounded-lg border-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
                  {selectedMaterial}
                </div>
              </div>

              

              

              <div>
                <label className="block text-lg mb-2" style={{ color: 'var(--foreground)' }}>Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 text-lg rounded-lg border-2 focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCancelForm}
                  className="flex-1 px-6 py-4 text-xl rounded-xl border-3 transition-colors"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMaterial}
                  className="flex-1 px-6 py-4 text-xl rounded-xl border-3 transition-colors"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ring)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
                >
                  Add Material
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
