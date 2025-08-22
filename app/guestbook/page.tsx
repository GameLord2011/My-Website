import { useState, useEffect } from "react";

interface GuestbookMessage {
  id: number;
  name: string;
  message: string;
}

export default function Page() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    setName("");
    setMessage("");
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then(setMessages);
  };

  return (
    <main>
      <div>
        <h1>Guestbook</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            required
          />
          <button type="submit">Sign</button>
        </form>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              <b>{msg.name}:</b> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
