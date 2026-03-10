import { useState } from "react";
import { User, Bell } from "lucide-react";
import { LoginPage } from "./components/LoginPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { MyTasksPage } from "./components/MyMaterialsPage";
import { MyMilestonesPage } from "./components/MyMilestonesPage";
import { MyDoctorsPage } from "./components/MyDoctorsPage";
import { ChatPage } from "./components/ChatPage";

export default function App() {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMyMaterials, setShowMyMaterials] = useState(false);
  const [showMyMilestones, setShowMyMilestones] = useState(false);
  const [showMyDoctors, setShowMyDoctors] = useState(false);
  const [showChat, setShowChat] = useState(false);

  if (showLogin) {
    return <LoginPage onBack={() => setShowLogin(false)} />;
  }

  if (showNotifications) {
    return <NotificationsPage onBack={() => setShowNotifications(false)} />;
  }

  if (showMyMaterials) {
    return <MyTasksPage onBack={() => setShowMyMaterials(false)} />;
  }

  if (showMyMilestones) {
    return <MyMilestonesPage onBack={() => setShowMyMilestones(false)} />;
  }

  if (showMyDoctors) {
    return <MyDoctorsPage onBack={() => setShowMyDoctors(false)} />;
  }

  if (showChat) {
    return <ChatPage onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-0" style={{ backgroundColor: 'var(--background)' }}>
      <button 
        onClick={() => setShowLogin(true)}
        className="absolute top-6 left-6 p-5 rounded-xl border-2 md:border-3 transition-colors"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
      >
        <User className="w-7 h-7 md:w-9 md:h-9" />
      </button>
      <button 
        onClick={() => setShowNotifications(true)}
        className="absolute top-6 right-6 p-5 rounded-xl border-2 md:border-3 transition-colors"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--muted)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--card)'}
      >
        <Bell className="w-7 h-7 md:w-9 md:h-9" />
      </button>
      <div className="w-full max-w-md flex flex-col gap-4">
        <button
          onClick={() => {
            setActiveButton(1);
            setShowMyMaterials(true);
          }}
          className="w-full px-8 py-6 text-lg sm:text-xl rounded-xl border-3 transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: activeButton === 1 ? 'var(--primary)' : 'var(--card)',
            color: activeButton === 1 ? 'var(--primary-foreground)' : 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (activeButton !== 1) e.currentTarget.style.backgroundColor = 'var(--muted)';
          }}
          onMouseLeave={(e) => {
            if (activeButton !== 1) e.currentTarget.style.backgroundColor = 'var(--card)';
          }}
        >
          My Materials
        </button>
        <button
          onClick={() => {
            setActiveButton(2);
            setShowMyMilestones(true);
          }}
          className="w-full px-8 py-6 text-lg sm:text-xl rounded-xl border-3 transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: activeButton === 2 ? 'var(--primary)' : 'var(--card)',
            color: activeButton === 2 ? 'var(--primary-foreground)' : 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (activeButton !== 2) e.currentTarget.style.backgroundColor = 'var(--muted)';
          }}
          onMouseLeave={(e) => {
            if (activeButton !== 2) e.currentTarget.style.backgroundColor = 'var(--card)';
          }}
        >
          My Milestones
        </button>
        
        <button
          onClick={() => {
            setActiveButton(3);
            setShowMyDoctors(true);
          }}
          className="w-full px-6 py-5 text-base sm:text-xl rounded-xl border-3 transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: activeButton === 3 ? 'var(--primary)' : 'var(--card)',
            color: activeButton === 3 ? 'var(--primary-foreground)' : 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (activeButton !== 3) e.currentTarget.style.backgroundColor = 'var(--muted)';
          }}
          onMouseLeave={(e) => {
            if (activeButton !== 3) e.currentTarget.style.backgroundColor = 'var(--card)';
          }}
        >
          My Contractors
        </button>
        <button
          onClick={() => {
            setActiveButton(4);
            setShowChat(true);
          }}
          className="w-full px-6 py-5 text-base sm:text-xl rounded-xl border-3 transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: activeButton === 4 ? 'var(--primary)' : 'var(--card)',
            color: activeButton === 4 ? 'var(--primary-foreground)' : 'var(--foreground)'
          }}
          onMouseEnter={(e) => {
            if (activeButton !== 4) e.currentTarget.style.backgroundColor = 'var(--muted)';
          }}
          onMouseLeave={(e) => {
            if (activeButton !== 4) e.currentTarget.style.backgroundColor = 'var(--card)';
          }}
        >
          Support
        </button>
      </div>
    </div>
  );
}
