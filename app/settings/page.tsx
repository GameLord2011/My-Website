"use client";

import "7.css/dist/7.scoped.css";
import { useAnimations } from "components/settingsProvider";
import { useTheme } from "components/settingsProvider";

export default function Page() {
    const { anims, toggleAnims } = useAnimations();
    const { theme, toggleTheme } = useTheme();

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
                <div className="flex justify-end pr-[8px]">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded bg-(--nav-bkg) p-2 transition-all duration-300 ease-in-out"
                    >
                        {theme === "light" ? "☀️" : "🌙"}
                    </button>
                </div>
            </div>
            <br />
            <div className="win7 flex">
                <p className="pr-[1ch]">Animations:</p>
                <button onClick={toggleAnims}>{anims ? "yes" : "no"}</button>
            </div>
        </main>
    );
}
