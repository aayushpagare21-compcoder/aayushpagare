"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget Button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-tl from-black via-zinc-600/20 to-black text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Iframe Container */}
      {isOpen && (
        <div className="fixed bottom-20 right-0 md:right-8 rounded-lg shadow-xl transition-all duration-400 overflow-hidden">
          {/* Responsive container for the iframe */}
          <div className="w-screen md:w-[300px] 2xl:w-[500px] h-[80vh]">
            <iframe
              src="https://embedme-l7sk.vercel.app/embed/e0b34064-a111-49f6-8b8c-08542665c9a7"
              className="w-full h-full border-0"
              title="Chatbot"
              allow="microphone"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
