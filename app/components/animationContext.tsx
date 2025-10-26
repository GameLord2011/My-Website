"use client";

import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { startTransition } from "react";
import { useState } from "react";

const AnimationContext = createContext({
    anims: false,
    hasLoadedAnims: false,
    toggleAnims: () => {},
});

export const AnimationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [anims, setAnims] = useState(true);
    const [hasLoadedAnims, setHasLoadedAnims] = useState(false);

    useLayoutEffect(() => {
        const stored = localStorage.getItem("animations");
        if (stored === null) {
            startTransition(() => {
                setAnims(true);
                setHasLoadedAnims(true);
            });
        } else {
            startTransition(() => {
                setAnims(stored?.includes("yurp") ? true : false);
                setHasLoadedAnims(true);
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("animations", anims ? "yurp" : "nope");
    }, [anims]);

    const toggleAnims = () => setAnims((prev) => !prev);

    return (
        <AnimationContext.Provider
            value={{ anims, toggleAnims, hasLoadedAnims }}
        >
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimations = () => useContext(AnimationContext);
