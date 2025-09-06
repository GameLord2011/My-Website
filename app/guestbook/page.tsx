'use client';

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
  const [censorTries, setCensorTries] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [dun, setDun] = useState(false);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  useEffect(() => {
    setDun(localStorage.getItem('hasSignedGuestbook') === 'true');
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || blocked || censorTries >= 3) return;
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    if (res.status === 400) {
      const next = censorTries + 1;
      setCensorTries(next);
      if (next < 3) {
        alert(`Your message contains inappropriate language. Attempts left: ${3 - next}`);
      } else {
        alert("You have triggered the censor list too many times. You cannot submit again until you reload the page.");
        setBlocked(true);
      }
      return;
}

    setCensorTries(0);
    setName("");
    setMessage("");
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then(setMessages);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-center bg-cover">
      <div className="max-w-lg w-full bg-[#f5ecd7]/90 border-8 border-[#c2b280] rounded-xl shadow-2xl p-8 relative">
        <h1 className="font-bold text-[#7c5c2a] mb-4 text-center drop-shadow papyrus_font">Guestbook</h1>
        <table className="table-fixed w-full border-separate border-spacing-y-2 text-lg text-left papyrus_font">
          <thead>
            <tr className="text-[#7c5c2a]">
              <th className="border-b border-[#c2b280] pb-2 text-left w-1/3">Name</th>
              <th className="border-b border-[#c2b280] pb-2 text-left w-2/3">Message</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(messages) && messages.length > 0 && messages.map((msg) => (
              <tr key={msg.id} className="border-b border-[#c2b280]/40">
                <td className="text-[#7c5c2a] w-1/3">{msg.name}</td>
                <td className="pl-4 text-[#4b3a1a] w-2/3">{msg.message}</td>
              </tr>
            ))}
            {!dun ?
            <tr>
              <td className="w-1/3 relative">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full text-[#4b3a1a] rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#c2b280] papyrus_font"
                />
              </td>
              <td className="w-2/3 relative">
                <form onSubmit={handleSubmit}>
                  <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Your message"
                    required
                    className="rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#c2b280] w-2/3 text-[#4b3a1a] papyrus_font"
                    disabled={blocked || censorTries >= 3}
                  />
                  <button
                    type="submit"
                    className="bg-[#c2b280] text-white font-bold py-1 px-4 rounded shadow hover:bg-[#a68b5b] transition w-1/3 papyrus_font"
                    disabled={blocked || censorTries >= 3}
                  >Sign</button>
                </form>
              </td>
            </tr> : null}
          </tbody>
        </table>
        <style jsx>{`
          main, table, input, button {
            font-family: 'Papyrus, fantasy';
          }
        `}</style>
      </div>
    </main>
  );
}
