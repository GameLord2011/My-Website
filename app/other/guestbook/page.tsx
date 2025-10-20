"use client";

import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { startTransition } from "react";
import { useState } from "react";
import { useRef } from "react";
import Win7Dialog from "components/win7dialog";
import { Win7DialogHandle } from "components/win7dialog";

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [otherDialogMessage, setOtherDialogMessage] = useState(false);
    const [overFlowMessage, setOverFlowMessage] = useState(false);
    const dialogRef = useRef<Win7DialogHandle>(null);

    useEffect(() => {
        fetch("/api/other/guestbook")
            .then((res) => res.json())
            .then(setMessages);
    }, []);

    useLayoutEffect(() => {
        startTransition(() => {
            setDun(
                localStorage.getItem("hasSignedGuestbook") === "true" ||
                    localStorage.getItem("blocked") === "yes",
            );
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message || blocked || censorTries >= 3) return;
        if (name.length > 100 || message.length > 100) {
            setName("");
            setMessage("");
            setOverFlowMessage(true);
            setDialogOpen(true);
            dialogRef.current?.show();
            return;
        }
        const res = await fetch("/api/other/guestbook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message }),
        });
        if (res.status === 400) {
            const next = censorTries + 1;
            setCensorTries(next);
            if (next < 3) {
                setDialogOpen(true);
                dialogRef.current?.show();
            } else {
                setOtherDialogMessage(true);
                dialogRef.current?.show();
                setBlocked(true);
                localStorage.setItem("blocked", "yes");
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
            return;
        }

        localStorage.setItem("hasSignedGuestbook", "true");
        location.reload();
    };

    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-cover bg-center">
                <div className="jio2:border-8 jio2:p-8 relative w-full max-w-lg rounded-xl border-0 border-[#c2b280] bg-[#f5ecd7] px-1 shadow-2xl">
                    <h1 className="papyrus_font mb-4 text-center font-bold text-[#7c5c2a] drop-shadow">
                        Guestbook
                    </h1>
                    <table className="papyrus_font jio2:text-lg w-full table-fixed border-separate border-spacing-y-2 text-left text-xs">
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
                                    <tr
                                        key={msg.id}
                                        className="border-b border-[#c2b280]/40"
                                    >
                                        <td className="jio2:text-base w-1/3 text-xs wrap-anywhere text-[#7c5c2a]">
                                            {msg.name}
                                        </td>
                                        <td className="jio2:text-base w-2/3 pl-4 text-xs wrap-anywhere text-[#4b3a1a]">
                                            {msg.message}
                                        </td>
                                    </tr>
                                ))}
                            {!dun ? (
                                <tr>
                                    <td className="jio2:text-base relative w-1/3 text-xs">
                                        <input
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Your name"
                                            required
                                            className="papyrus_font jio2:text-base w-full rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg text-xs text-[#4b3a1a] shadow-inner focus:ring-2 focus:ring-[#c2b280] focus:outline-none"
                                            disabled={
                                                blocked || censorTries >= 3
                                            }
                                        />
                                    </td>
                                    <td className="jio2:text-base relative w-2/3 text-xs">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                                placeholder="Your message"
                                                required
                                                className="papyrus_font jio2:text-base w-2/3 rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg text-xs text-[#4b3a1a] shadow-inner focus:ring-2 focus:ring-[#c2b280] focus:outline-none"
                                                disabled={
                                                    blocked || censorTries >= 3
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="papyrus_font w-1/3 rounded bg-[#c2b280] px-4 py-1 font-bold text-white shadow transition hover:bg-[#a68b5b]"
                                                disabled={
                                                    blocked || censorTries >= 3
                                                }
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
                {dialogOpen && (
                    <Win7Dialog title="Censorship Warning" ref={dialogRef}>
                        {!otherDialogMessage ? (
                            <p>
                                Please dont use bad words! You have{" "}
                                {3 - censorTries} tries left.
                            </p>
                        ) : !overFlowMessage ? (
                            <p>
                                YOU HAVE ATTEMPTED TO USE CENSCORED WORDS TOo
                                MANY TIMES, THE BAN HAMMER HATH BEEN SWUNG!
                            </p>
                        ) : (
                            <p>
                                You cant have a name or message &gt; 100
                                characters.
                            </p>
                        )}
                    </Win7Dialog>
                )}
            </main>
            <br />
        </>
    );
}
