import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

interface DoctorChatPageProps {
  onBack: () => void;
  doctorName: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "doctor";
  timestamp: Date;
}

export function DoctorChatPage({ onBack, doctorName }: DoctorChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! This is ${doctorName}. How can I help you today?`,
      sender: "doctor",
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

      // Simulate doctor response after a short delay
      setTimeout(() => {
        const doctorMessage: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. I'll get back to you shortly.",
          sender: "doctor",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, doctorMessage]);
      }, 1000);
    }
  };

  return (
    <div className="size-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-8 border-b-3 border-black">
        <button
          onClick={onBack}
          className="p-5 rounded-xl border-3 border-black bg-white text-black hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-4xl">{doctorName}</h1>
        <div className="w-[72px]"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-6 py-4 rounded-xl border-3 border-black ${
                message.sender === "user"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              <p className="text-lg">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border-t-3 border-black">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Type your message..."
            className="flex-1 px-6 py-5 text-xl rounded-xl border-3 border-black focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={handleSendMessage}
            className="p-5 rounded-xl border-3 border-black bg-black text-white hover:bg-gray-800 transition-colors"
          >
            <Send className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
