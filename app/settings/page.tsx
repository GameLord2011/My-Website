"use client";

import ThemeSwitcher from "components/themeswitcher";
import { useState } from "react";
import { useEffect } from "react";
import "7.css/dist/7.scoped.css";
import { useAnimations } from "components/animationContext";

export default function Page() {
    //TODO: make this do anything at all.

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const { anims, toggleAnims } = useAnimations();

    if (!isLoaded) return null;

    return (
        <main className="flex flex-col items-center justify-center">
            <br />
            <div className="flex">
                {/* 
                    Quick css class, one ch is the width of the zero character in the
                    current font, and since we're working with a monospaced font, it is
                    one character width.
                */}
                <p className="py-[1ch] pr-[1ch]">Theme:</p>
                <ThemeSwitcher />
            </div>
            <br />
            <div className="win7 flex">
                <p className="pr-[1ch]">Animations:</p>
                <button onClick={toggleAnims}>{anims ? "yes" : "no"}</button>
            </div>
        </main>
    );
}
