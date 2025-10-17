"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useState } from "react";
import { PokemonSearchSuggestionsProps } from "./complexTypes";

export default function PokemonSearchSuggestions({
    suggestions,
    visible,
    onSelect,
    inputRef,
}: PokemonSearchSuggestionsProps) {
    const router = useRouter();
    const [position, setPosition] = useState({ width: 0, left: 0, top: 0 });

    useEffect(() => {
        const updatePosition = () => {
            const rect = inputRef.current?.getBoundingClientRect();
            setPosition({
                width: rect?.width ?? 0,
                left: rect?.left ?? 0,
                top: (rect?.bottom ?? 0) + window.scrollY,
            });
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    }, [inputRef]);

    if (!visible || suggestions.length === 0 || typeof window === "undefined") {
        return null;
    }

    return createPortal(
        <>
            <style jsx>{`
                .ws {
                    width: ${position.width}px;
                }
                .ls {
                    left: ${position.left}px;
                }
                .ts {
                    top: ${position.top + 4}px;
                }
            `}</style>
            <div
                className={`ws ls ts absolute z-[9999] rounded-lg border border-gray-300 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80`}
            >
                {suggestions.map((name) => (
                    <button
                        key={name}
                        type="button"
                        className="block w-full px-4 py-2 text-left text-gray-800 capitalize transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onSelect(name);
                            router.push(
                                `/other/pokesearch?q=${encodeURIComponent(name)}`,
                            );
                        }}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </>,
        document.body,
    );
}
