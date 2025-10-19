"use client";

import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const AnimationContext = createContext({
    anims: true,
    toggleAnims: () => {},
});

export const AnimationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [anims, setAnims] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("animations");
        setAnims(stored?.includes("yurp") ? true : false);
    }, []);

    useEffect(() => {
        localStorage.setItem("animations", anims ? "yurp" : "nope");
    }, [anims]);

    const toggleAnims = () => setAnims((prev) => !prev);

    return (
        <AnimationContext.Provider value={{ anims, toggleAnims }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimations = () => useContext(AnimationContext);
