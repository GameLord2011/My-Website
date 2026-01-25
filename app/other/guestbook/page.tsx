"use client";

import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import Win7Dialog from "components/win7dialog";
import { Win7DialogHandle } from "components/win7dialog";
import { Jacquard_24 } from "next/font/google";
import { Mea_Culpa } from "next/font/google";
import { Montez } from "next/font/google";
import { Splash } from "next/font/google";
import { Permanent_Marker } from "next/font/google";
import { Caveat } from "next/font/google";
import { Sofia } from "next/font/google";

const jacquard = Jacquard_24({
    weight: "400",
    subsets: ["latin"],
    preload: true,
});

const meaCulpa = Mea_Culpa({
    weight: "400",
});

const montez = Montez({
    weight: "400",
});

const splash = Splash({
    weight: "400",
});

const permanentMarker = Permanent_Marker({
    weight: "400",
});

const caveat = Caveat({
    weight: "400",
});

const sofia = Sofia({
    weight: "400",
});

interface GuestbookMessage {
    id: number;
    name: string;
    message: string;
}

type DialogState = "none" | "overflow" | "censor" | "blocked";

const fonts = [
    meaCulpa.className,
    montez.className,
    splash.className,
    permanentMarker.className,
    caveat.className,
    sofia.className,
];

/*
    It's fine, everything's fine.
*/
function MessageRow({ msg }: { msg: GuestbookMessage }) {
    const fontClass = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * fonts.length);
        return fonts[randomIndex];
    }, []);

    return (
        <tr className={`${fontClass} border-b border-[#c2b280]/40`}>
            <td className="jio2:text-base w-1/3 wrap-anywhere text-[#7c5c2a]">
                {msg.name}
            </td>
            <td className="jio2:text-base w-2/3 pl-4 wrap-anywhere text-[#4b3a1a]">
                {msg.message}
            </td>
        </tr>
    );
}

export default function Page() {
    const [messages, setMessages] = useState<GuestbookMessage[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    let censorTries = useRef(0);
    const [blocked, setBlocked] = useState(false);
    const dun =
        typeof window !== "undefined" &&
        (localStorage.getItem("hasSignedGuestbook") === "true" ||
            localStorage.getItem("blocked") === "yes");
    const [dialogState, setDialogState] = useState<DialogState>("none");
    const dialogRef = useRef<Win7DialogHandle>(null);

    useEffect(() => {
        fetch("/api/other/guestbook", {
            method: "GET",
            headers: {
                isFromGmlrd: "yep",
            },
        })
            .then((res) => res.json())
            .then(setMessages);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message || blocked || censorTries.current >= 3) return;
        name.replaceAll(/\‌+/g, ""); // These are needed.
        message.replaceAll(/\‌+/g, "");
        if (name.length > 100 || message.length > 100) {
            setDialogState("overflow");
            dialogRef.current?.show();
            return;
        }
        const res = await fetch("/api/other/guestbook", {
            method: "POST",
            headers: { "Content-Type": "application/json", isFromGmlrd: "yep" },
            body: JSON.stringify({ name, message }),
        });
        if (res.status === 422) {
            censorTries.current++;
            if (censorTries.current < 3) {
                setDialogState("censor");
                dialogRef.current?.show();
            } else {
                setDialogState("blocked");
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
            <main
                className={`${jacquard.className} flex min-h-screen items-center justify-center bg-cover bg-center`}
            >
                <div className="jio2:border-8 jio2:p-8 relative w-full max-w-lg rounded-xl border-0 border-[#c2b280] bg-[#f5ecd7] px-1 shadow-2xl">
                    <h1 className="papyrus_font mb-4 text-center text-2xl font-bold text-[#7c5c2a] drop-shadow">
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
                                    <MessageRow key={msg.id} msg={msg} />
                                ))}
                            {!dun ? (
                                <tr>
                                    <td className="jio2:text-base relative w-1/3 text-base">
                                        <input
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Your name"
                                            required
                                            className="jio2:text-base w-full rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg text-xs text-[#4b3a1a] shadow-inner focus:ring-2 focus:ring-[#c2b280] focus:outline-none"
                                            disabled={
                                                blocked ||
                                                censorTries.current >= 3
                                            }
                                        />
                                    </td>
                                    <td className="jio2:text-base relative w-2/3 text-base">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                                placeholder="Your message"
                                                required
                                                className="jio2:text-base w-2/3 rounded border border-[#c2b280] bg-[#f5ecd7] px-2 py-1 text-lg text-xs text-[#4b3a1a] shadow-inner focus:ring-2 focus:ring-[#c2b280] focus:outline-none"
                                                disabled={
                                                    blocked ||
                                                    censorTries.current >= 3
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="w-1/3 rounded bg-[#c2b280] px-4 py-1 font-bold text-white shadow transition hover:bg-[#a68b5b]"
                                                disabled={
                                                    blocked ||
                                                    censorTries.current >= 3
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
                </div>
                {dialogState !== "none" && (
                    <Win7Dialog title="Warning" ref={dialogRef}>
                        {dialogState === "overflow" && (
                            <p>
                                You can't have a name or message &gt; 100
                                characters.
                            </p>
                        )}
                        {dialogState === "censor" && (
                            <p>
                                Please dont use bad words! You have{" "}
                                {3 - censorTries.current} tries left.
                            </p>
                        )}
                        {dialogState === "blocked" && (
                            <p>
                                YOU HAVE ATTEMPTED TO CUSS ONE TOO MANY TIMES,
                                THE BAN HAMMER HATH BEEN SWUNG!
                            </p>
                        )}
                    </Win7Dialog>
                )}
            </main>
            <br />
        </>
    );
}
