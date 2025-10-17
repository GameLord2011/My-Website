"use client";

import ThemeSwitcher from "components/themeswitcher";
import { useState } from "react";
import { useEffect } from "react";
import "7.css/dist/7.scoped.css";

export default function Page() {
    //TODO: make this do anything at all.

    const [isLoaded, setIsLoaded] = useState(false);
    const [noAnims, setNoAnims] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;

    return (
        <main className="flex flex-col items-center justify-center">
            <br />
            <div className="flex">
                <p className="py-[1ch] pr-[1ch]">Theme:</p> <ThemeSwitcher />
            </div>
            <br />
            <div className="win7 flex">
                <p className="pr-[1ch]">Animations:</p>
                {/* 
                    Quick css class, one ch is the width of the zero character in the
                    current font, and since we're working with a monospaced font, it is
                    one character width.
                */}
                <button
                    onClick={() => {
                        setNoAnims(!noAnims);
                        console.log(noAnims);
                    }}
                >
                    {noAnims ? "yes" : "no"}
                </button>
            </div>
        </main>
    );
}
