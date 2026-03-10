import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

interface ChatPageProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
}

export function ChatPage({ onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      // Simulate support response after a short delay
      setTimeout(() => {
        const supportMessage: Message = {
          id: messages.length + 2,
          text: "Thanks for your message. Our support team will assist you shortly.",
          sender: "support",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, supportMessage]);
      }, 1000);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between px-4 py-10 sm:px-6"
      style={{ backgroundColor: 'var(--background)', paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
    >
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-4 rounded-xl border-2 md:border-3 transition-colors"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--card)')}
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <h1 className="text-3xl sm:text-4xl font-semibold" style={{ color: 'var(--foreground)' }}>
            Support
          </h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="w-full max-w-lg mt-auto">
        <div className="flex flex-col rounded-2xl border-2 border-black bg-white shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: '75vh', minHeight: '60vh' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl border-2 ${
                    message.sender === "user"
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black"
                  }`}
                >
                  <p className="text-base sm:text-lg">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t-2 border-black bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 text-base sm:text-lg rounded-xl border-2 focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
              />
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-xl border-2 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
