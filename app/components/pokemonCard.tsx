"use client";

import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";

const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-600",
  ghost: "bg-purple-700",
  dragon: "bg-violet-600",
  dark: "bg-gray-800",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [isShiny, setIsShiny] = useState(false);

  const playCry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (pokemon.name.toLowerCase() === "type-null") {
      const audio = new Audio(
        "https://play.pokemonshowdown.com/audio/cries/typenull.mp3",
      );
      audio.play();
    } else {
      const audio = new Audio(
        `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`,
      );
      audio.play();
    }
  };

  const toggleShiny = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShiny(!isShiny);
  };

  return (
    <Link href={`/other/pokesearch/${pokemon.name}`} className="relative block">
      <div className="rounded-lg bg-white p-4 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800/80">
        <div className="relative">
          <Image
            src={
              isShiny
                ? (pokemon.sprites.front_shiny ??
                  pokemon.sprites.front_default ??
                  "")
                : (pokemon.sprites.front_default ?? "")
            }
            alt={`${pokemon.name} ${isShiny ? "shiny" : "normal"}`}
            width={96}
            height={96}
            className="mx-auto"
            priority={false}
          />
          <button
            onClick={toggleShiny}
            className="absolute right-0 bottom-0 rounded-full bg-indigo-100 p-1 transition-colors hover:bg-indigo-200"
            title={`Switch to ${isShiny ? "normal" : "shiny"} form`}
          >
            ✨
          </button>
        </div>
        <div className="mt-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
            <button
              onClick={playCry}
              className="rounded-full bg-indigo-100 p-1 transition-colors hover:bg-indigo-200"
              title="Play cry"
            >
              🔊
            </button>
          </div>
          <div className="mt-1 flex justify-center gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`rounded-full px-2 py-0.5 text-xs text-white ${typeColors[type.type.name as keyof typeof typeColors] || "bg-gray-400"}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
