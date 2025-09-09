"use client";

import { useEffect } from "react";
import { useState } from "react";

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
    setDun(localStorage.getItem("hasSignedGuestbook") === "true");
  }, []);

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
        alert(
          `Your message contains inappropriate language. Attempts left: ${3 - next}`,
        );
      } else {
        alert(
          "You have triggered the censor list too many times. You cannot submit again.",
        );
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
    <main className="flex min-h-screen items-center justify-center bg-cover bg-center">
      <div className="relative w-full max-w-lg rounded-xl border-8 border-[#c2b280] bg-[#f5ecd7]/90 p-8 shadow-2xl">
        <h1 className="papyrus_font mb-4 text-center font-bold text-[#7c5c2a] drop-shadow">
          Guestbook
        </h1>
        <table className="papyrus_font w-full table-fixed border-separate border-spacing-y-2 text-left text-lg">
          <thead>
            <tr className="text-[#7c5c2a]">
              <th className="w-1/3 border-b border-[#c2b280] pb-2 text-left">
                Name
              </th>
              <th className="w-2/3 border-b border-[#c2b280] pb-2 text-left">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(messages) &&
              messages.length > 0 &&
              messages.map((msg) => (
                <tr key={msg.id} className="border-b border-[#c2b280]/40">
                  <td className="w-1/3 text-[#7c5c2a]">{msg.name}</td>
                  <td className="w-2/3 pl-4 text-[#4b3a1a]">{msg.message}</td>
                </tr>
              ))}
            {!dun ? (
              <tr>
                <td className="relative w-1/3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="papyrus_font w-full rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg text-[#4b3a1a] shadow-inner focus:ring-2 focus:ring-[#c2b280] focus:outline-none"
                  />
                </td>
                <td className="relative w-2/3">
                  <form onSubmit={handleSubmit}>
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message"
                      required
                      className="papyrus_font w-2/3 rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg text-[#4b3a1a] shadow-inner focus:ring-2 focus:ring-[#c2b280] focus:outline-none"
                      disabled={blocked || censorTries >= 3}
                    />
                    <button
                      type="submit"
                      className="papyrus_font w-1/3 rounded bg-[#c2b280] px-4 py-1 font-bold text-white shadow transition hover:bg-[#a68b5b]"
                      disabled={blocked || censorTries >= 3}
                    >
                      Sign
                    </button>
                  </form>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <style jsx>{`
          main,
          table,
          input,
          button {
            font-family: "Papyrus, fantasy";
          }
        `}</style>
      </div>
    </main>
  );
}
