import React, { useState } from 'react';

const Chatbot = ({ city }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const askBot = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city, query: input }),
      });

      const data = await res.json();
      const botMsg = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, error reaching the AI 😢' },
      ]);
    }

    setInput('');
  };

  return (
    <div className="fixed right-6 bottom-6 bg-gray-800 p-4 rounded shadow-lg w-80 max-h-[60vh] overflow-y-auto">
      <div className="font-bold text-lg mb-2">ClimaBot 🤖</div>
      {messages.map((msg, i) => (
        <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
          <b>{msg.sender}:</b> {msg.text}
        </div>
      ))}
      <input
        className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askBot()}
      />
      <button className="mt-2 w-full bg-blue-600 py-1 rounded" onClick={askBot}>
        Ask
      </button>
    </div>
  );
};

export default Chatbot;
