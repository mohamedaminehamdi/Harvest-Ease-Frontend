'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatbotPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await apiClient.post('/chatbot/query', {
        message: userMessage,
      });

      if (res.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: res.data.response },
        ]);
      }
    } catch (error) {
      console.error('Chatbot query failed:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Sorry, I could not process your request.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-2xl mx-auto h-screen flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Agricultural Assistant</h1>

        {/* Chat Messages */}
        <div className="flex-1 bg-white rounded-lg shadow p-6 mb-6 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p>Welcome! Ask me anything about farming.</p>
                <p className="text-sm mt-2">Try: "How to water tomatoes?" or "What about pest control?"</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-lg">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your farming question..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
