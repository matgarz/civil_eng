import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

interface NotificationsPageProps {
  onBack: () => void;
}

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const [meds, setMeds] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [chats, setChats] = useState(false);

  return (
    <div className="size-full flex items-center justify-center bg-white">
      <button
        onClick={onBack}
        className="absolute top-8 left-8 p-5 rounded-xl border-3 border-black bg-white text-black hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-8 h-8" />
      </button>

      <div className="w-full max-w-md px-8">
        <h1 className="text-4xl mb-8 text-center">Notifications</h1>
        
        <div className="flex flex-col gap-6">
          {/* Toggle Switches */}
          <div className="flex items-center justify-between py-4 border-b-2 border-gray-200">
            <span className="text-xl">Materials</span>
            <button
              onClick={() => setMeds(!meds)}
              className={`relative w-20 h-10 rounded-full transition-colors ${
                meds ? "bg-black" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-transform ${
                  meds ? "translate-x-11" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b-2 border-gray-200">
            <span className="text-xl">Schedule</span>
            <button
              onClick={() => setSchedule(!schedule)}
              className={`relative w-20 h-10 rounded-full transition-colors ${
                schedule ? "bg-black" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-transform ${
                  schedule ? "translate-x-11" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-4 border-b-2 border-gray-200">
            <span className="text-xl">Chats</span>
            <button
              onClick={() => setChats(!chats)}
              className={`relative w-20 h-10 rounded-full transition-colors ${
                chats ? "bg-black" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-8 h-8 bg-white rounded-full transition-transform ${
                  chats ? "translate-x-11" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Add Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg rounded-xl border-3 border-black bg-white text-black hover:bg-gray-100 transition-colors">
              <Plus className="w-6 h-6" />
              Add Ringtone
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-6 py-5 text-lg rounded-xl border-3 border-black bg-white text-black hover:bg-gray-100 transition-colors">
              <Plus className="w-6 h-6" />
              Add Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
