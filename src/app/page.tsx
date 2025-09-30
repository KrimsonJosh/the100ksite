"use client";
import React, { useState, useEffect } from "react";

type Message = {
  id: number;
  text: string;
  created_at: string;
}
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  // Load all messages into messages state
  useEffect(() => {
    fetch("/api/messages")
    .then((res) => res.json()).then((data) => setMessages(data.messages || []))
  }, []);

  // send new message :)
  const sendMessage = async (e:React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();

    if (data.message) {
      setMessages((prev) => [...prev, data.message]);
      setText("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-10">
      <h1 className="text-2xl font-bold mb-4 text-center w-full">Day 1 Chat</h1>
      <h2 className="text-2xl font-bold mb-4 text-center w-full">Brandon was here</h2>

      <div className="w-full max-w-md border rounded p-2 sm:p-4 space-y-2 mb-4 bg-white/80">
        {messages.map((m) => (
          <div key={m.id} className="p-2 bg-gray-100 rounded break-words text-sm sm:text-base">
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded text-sm sm:text-base"
          placeholder="Type a message"
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded text-base active:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </form>

    </main>
  );
}
