import { useState } from "react";
import { ArrowLeft, Plus, Check } from "lucide-react";

interface ContractorInventoryPageProps {
  onBack: () => void;
  onAddContractor: (contractorName: string) => void;
  existingContractors: string[];
}

interface Contractor {
  name: string;
  trade: string;
}

export function ContractorInventoryPage({
  onBack,
  onAddContractor,
  existingContractors,
}: ContractorInventoryPageProps) {
  const [contractors] = useState<Contractor[]>([
    { name: "Alex Martinez", trade: "Electrician" },
    { name: "Liam O'Connor", trade: "Plumber" },
    { name: "Noah Kim", trade: "Carpenter" },
    { name: "Marcus Lee", trade: "Roofer" },
    { name: "Ethan Reed", trade: "Welder" },
    { name: "Chris Johnson", trade: "Sheetmetal Worker" },
    { name: "Jake Turner", trade: "Mechanic" },
    { name: "Tyler Brooks", trade: "Bricklayer" },
    { name: "Dylan Scott", trade: "HVAC Technician" },
    { name: "Ryan Foster", trade: "Painter" },
  ]);

  const [addedContractors, setAddedContractors] = useState<string[]>([]);

  const handleAddContractor = (contractorName: string) => {
    if (
      !addedContractors.includes(contractorName) &&
      !existingContractors.includes(contractorName)
    ) {
      onAddContractor(contractorName);
      setAddedContractors([...addedContractors, contractorName]);
    }
  };

  const isContractorAdded = (contractorName: string) => {
    return (
      existingContractors.includes(contractorName) ||
      addedContractors.includes(contractorName)
    );
  };

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      <div className="flex items-center justify-between p-8 border-b-3" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={onBack}
          className="p-5 rounded-xl border-3 transition-colors"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card)", color: "var(--foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--card)")}
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-4xl" style={{ color: "var(--foreground)" }}>
          Contractor Inventory
        </h1>
        <div className="w-[72px]"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {contractors.map((contractor) => {
            const isAdded = isContractorAdded(contractor.name);
            return (
              <div
                key={contractor.name}
                className="flex items-center justify-between p-6 rounded-xl border-3"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
              >
                <div>
                  <h3 className="text-2xl" style={{ color: "var(--foreground)" }}>
                    {contractor.name}
                  </h3>
                  <p className="text-lg mt-1" style={{ color: "var(--muted-foreground)" }}>
                    {contractor.trade}
                  </p>
                </div>
                <button
                  onClick={() => handleAddContractor(contractor.name)}
                  disabled={isAdded}
                  className="px-6 py-3 rounded-xl border-3 transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: isAdded ? "var(--muted)" : "var(--primary)",
                    color: "var(--primary-foreground)",
                    cursor: isAdded ? "not-allowed" : "pointer",
                    opacity: isAdded ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isAdded) e.currentTarget.style.backgroundColor = "var(--ring)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isAdded) e.currentTarget.style.backgroundColor = "var(--primary)";
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
    </div>
  );
}
