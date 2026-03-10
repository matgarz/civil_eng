import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface SchedulePageProps {
  onBack: () => void;
}

export function SchedulePage({ onBack }: SchedulePageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isToday = 
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

      days.push(
        <button
          key={day}
          className="aspect-square rounded-lg border-2 transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: isToday ? 'var(--accent)' : 'var(--card)',
            color: isToday ? 'var(--accent-foreground)' : 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (!isToday) e.currentTarget.style.backgroundColor = 'var(--muted)';
          }}
          onMouseLeave={(e) => {
            if (!isToday) e.currentTarget.style.backgroundColor = 'var(--card)';
          }}
        >
          <span className="text-base">{day}</span>
        </button>
      );
    }

    return days;
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
        <h1 className="text-4xl" style={{ color: 'var(--foreground)' }}>Schedule</h1>
        <div className="w-[72px]"></div>
      </div>

      <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-3 rounded-lg border-2 transition-colors"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl" style={{ color: 'var(--foreground)' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-3 rounded-lg border-2 transition-colors"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-base" style={{ color: 'var(--muted-foreground)' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
}
