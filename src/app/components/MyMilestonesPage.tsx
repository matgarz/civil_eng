import { useState } from "react";
import { ArrowLeft, Plus, X, Calendar } from "lucide-react";
import { SchedulePage } from "./SchedulePage";

interface Milestone {
  title: string;
  date: string;
  time: string;
}

interface MyMilestonesPageProps {
  onBack: () => void;
}

export function MyMilestonesPage({ onBack }: MyMilestonesPageProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: "", date: "", time: "" }]);
    setEditingIndex(milestones.length);
    setEditTitle("");
    setEditDate("");
    setEditTime("");
  };

  const handleMilestoneClick = (index: number) => {
    setEditingIndex(index);
    setEditTitle(milestones[index].title);
    setEditDate(milestones[index].date);
    setEditTime(milestones[index].time);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editTitle.trim() && editDate && editTime) {
      const updatedMilestones = [...milestones];
      updatedMilestones[editingIndex] = {
        title: editTitle.trim(),
        date: editDate,
        time: editTime,
      };
      setMilestones(updatedMilestones);
      setEditingIndex(null);
      setEditTitle("");
      setEditDate("");
      setEditTime("");
    }
  };

  const handleCancelEdit = () => {
    if (editingIndex !== null && !milestones[editingIndex].title) {
      setMilestones(milestones.filter((_, i) => i !== editingIndex));
    }
    setEditingIndex(null);
    setEditTitle("");
    setEditDate("");
    setEditTime("");
  };

  const handleDeleteMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const formatMilestoneDisplay = (milestone: Milestone) => {
    const date = new Date(milestone.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${milestone.title} - ${formattedDate} at ${milestone.time}`;
  };

  if (showSchedule) {
    return <SchedulePage onBack={() => setShowSchedule(false)} />;
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

      <button
        onClick={() => setShowSchedule(true)}
        className="absolute top-4 right-4 p-4 rounded-xl border-2 md:border-3 transition-colors"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
      >
        <Calendar className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="w-full max-w-lg px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl mb-8 text-center" style={{ color: 'var(--foreground)' }}>
          My Milestones
        </h1>

        <div className="flex flex-col gap-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3">
              {editingIndex === index ? (
                <div className="flex-1 flex flex-col gap-3">
                  <input
                    type="text"
                    value={editTitle}
                    placeholder="Milestone title"
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-4 text-base sm:text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    autoFocus
                  />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="flex-1 px-4 py-4 text-base sm:text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    />
                    <input
                      type="time"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      className="flex-1 px-4 py-4 text-base sm:text-lg rounded-xl border-3 focus:outline-none focus:ring-2"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-8 py-4 text-lg rounded-xl border-3 transition-colors"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ring)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-8 py-4 text-lg rounded-xl border-3 transition-colors"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
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
                    onClick={() => handleMilestoneClick(index)}
                    className="flex-1 px-4 py-4 text-base sm:text-lg rounded-xl border-3 transition-colors text-left"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                  >
                    {formatMilestoneDisplay(milestone)}
                  </button>

                  <button
                    onClick={() => handleDeleteMilestone(index)}
                    className="w-full sm:w-auto p-4 rounded-xl border-3 transition-colors"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            onClick={handleAddMilestone}
            className="w-full flex items-center justify-center gap-3 px-8 py-5 text-xl rounded-xl border-3 transition-colors mt-4"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ring)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
          >
            <Plus className="w-6 h-6" />
            Add Milestone
          </button>
        </div>
      </div>
    </div>
  );
}
