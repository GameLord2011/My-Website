"use client";

import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface PokemonSearchSuggestionsProps {
  suggestions: string[];
  visible: boolean;
  onSelect: (name: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function PokemonSearchSuggestions({
  suggestions,
  visible,
  onSelect,
  inputRef,
}: PokemonSearchSuggestionsProps) {
  const router = useRouter();

  if (!visible || suggestions.length === 0 || typeof window === "undefined") {
    return null;
  }

  const rect = inputRef.current?.getBoundingClientRect();
  const width = rect?.width ?? 0;
  const left = rect?.left ?? 0;
  const top = (rect?.bottom ?? 0) + window.scrollY;

  return createPortal(
    <>
      <style jsx>{`
        .ws {
          width: ${width}px;
        }
        .ls {
          left: ${left}px;
        }
        .ts {
          top: ${top + 4}px;
        }
      `}</style>
      <div
        className={`ws ls ts fixed z-[9999] rounded-lg border border-gray-300 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80`}
      >
        {suggestions.map((name) => (
          <button
            key={name}
            className="block w-full px-4 py-2 text-left text-gray-800 capitalize transition-colors duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(name);
              router.push(`/other/pokesearch?q=${encodeURIComponent(name)}`);
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
