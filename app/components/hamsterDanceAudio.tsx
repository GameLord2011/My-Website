// Why does this have to be a client component?
// I have no idea.

"use client";

import { useEffect } from "react";
import { useRef } from "react";

export default function HamsterDanceAudio() {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    });

    return (
        <audio loop autoPlay ref={audioRef}>
            <source src="/originaldedodedo.wav" type="audio/x-wav" />
        </audio>
    );
}
