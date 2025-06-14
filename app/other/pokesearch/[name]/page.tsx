"use client";

import { Pokemon } from "pokenode-ts";
import { PokemonClient } from "pokenode-ts";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-300 text-gray-800",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-gray-800",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-gray-800",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-300 text-gray-800",
  psychic: "bg-pink-500 text-white",
  bug: "bg-green-700 text-white",
  rock: "bg-gray-700 text-white",
  ghost: "bg-indigo-800 text-white",
  dark: "bg-gray-800 text-white",
  dragon: "bg-indigo-500 text-white",
  steel: "bg-gray-400 text-gray-800",
  fairy: "bg-pink-300 text-gray-800",
};

export default function PokemonPage({
  params: paramsPromise,
}: {
  params: Promise<{ name: string }>;
}) {
  const [params, setParams] = useState<{ name: string } | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [error, setError] = useState("");
  const [useMetric, setUseMetric] = useState(true); // State to toggle between metric and imperial

  const toggleUnits = () => {
    setUseMetric((prev) => !prev);
  };

  // Unwrap the params Promise
  useEffect(() => {
    paramsPromise
      .then((resolvedParams) => setParams(resolvedParams))
      .catch((err) => setError(`Failed to load params: ${err}`));
  }, [paramsPromise]);

  // Fetch Pokémon data when params are available
  useEffect(() => {
    if (!params) return;

    const fetchPokemon = async () => {
      try {
        const api = new PokemonClient();
        const data = await api.getPokemonByName(params.name);
        setPokemon(data);
      } catch (error) {
        setError(`Pokemon not found: ${error}`);
      }
    };
    fetchPokemon();
  }, [params]);

  const playCry = () => {
    if (pokemon) {
      const audio = new Audio(
        pokemon.name.search(/-/i) !== 1
          ? `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.replace(/-/i, "")}.mp3`
          : `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`,
      );
      audio.play();
    }
  };

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!params || !pokemon) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-full sm:max-w-2xl md:max-w-4xl">
        <div className="rounded-lg bg-white/80 p-2 shadow-lg sm:p-4 md:p-6 dark:bg-gray-800/80">
          <div className="mb-2 flex flex-col items-center sm:mb-4 sm:flex-row md:mb-6">
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
                width={100}
                height={100}
                className="h-24 w-24 sm:h-36 sm:w-36 md:h-40 md:w-40"
                priority={true}
                placeholder="empty"
              />
              <button
                type="button"
                onClick={() => setIsShiny(!isShiny)}
                className="absolute right-0 bottom-0 rounded-full bg-indigo-100 p-1 transition-colors hover:bg-indigo-200 sm:p-2 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                title={`Switch to ${isShiny ? "normal" : "shiny"} form`}
              >
                ✨
              </button>
            </div>
            <div className="mt-2 sm:mt-4 sm:ml-4">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <h1 className="text-xl font-bold capitalize sm:text-2xl md:text-3xl dark:text-white">
                  {pokemon.name}
                </h1>
                <button
                  type="button"
                  onClick={playCry}
                  className="rounded-full bg-indigo-100 p-1 transition-colors hover:bg-indigo-200 sm:p-2 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                  title="Play cry"
                >
                  🔊
                </button>
              </div>
              <div className="mt-1 flex flex-wrap justify-center gap-1 sm:mt-2 sm:justify-start sm:gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`rounded-full px-1 py-0.5 text-xs sm:px-2 sm:py-1 sm:text-sm ${typeColors[type.type.name] || "bg-gray-200 text-gray-800"}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
            <div>
              <h2 className="mb-1 text-base font-semibold sm:mb-2 sm:text-lg dark:text-white">
                Base Stats
              </h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-1">
                  <div className="flex justify-between dark:text-gray-200">
                    <span className="text-xs capitalize sm:text-sm">
                      {stat.stat.name}
                    </span>
                    <span className="text-xs sm:text-sm">{stat.base_stat}</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <style jsx>{`
                      .width-${stat.stat.name} {
                        width: ${(stat.base_stat / 255) * 100}%;
                      }
                    `}</style>
                    <div
                      className={`h-1 rounded-full bg-indigo-600 dark:bg-indigo-400 width-${stat.stat.name}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="mb-1 text-base font-semibold sm:mb-2 sm:text-lg dark:text-white">
                Details
              </h2>
              <div className="mb-2 flex items-center justify-center">
                <span className="mr-1 text-xs text-gray-700 sm:text-sm dark:text-gray-200">
                  m
                </span>
                <label className="relative inline-flex cursor-pointer content-center items-center self-center">
                  <label htmlFor="units" className="sr-only">
                    Toggle Units
                  </label>
                  <input
                    type="checkbox"
                    id="units"
                    checked={!useMetric}
                    onChange={toggleUnits}
                    className="peer sr-only self-center"
                  />
                  <div className="peer h-4 w-8 rounded-full bg-gray-200 peer-checked:bg-indigo-600 peer-focus:ring-4 peer-focus:ring-indigo-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-[2px] after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white sm:h-5 sm:w-10 sm:after:h-4 sm:after:w-4 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800"></div>
                </label>
                <span className="ml-1 text-xs text-gray-700 sm:text-sm dark:text-gray-200">
                  i
                </span>
              </div>
              <p className="text-xs sm:text-sm dark:text-gray-200">
                Height:{" "}
                {useMetric
                  ? `${pokemon.height / 10} m`
                  : `${(pokemon.height / 10) * 3.281} ft`}
              </p>
              <p className="text-xs sm:text-sm dark:text-gray-200">
                Weight:{" "}
                {useMetric
                  ? `${pokemon.weight / 10} kg`
                  : `${(pokemon.weight / 10) * 2.205} lbs`}
              </p>
              <div className="mt-2">
                <h3 className="mb-1 text-xs font-medium sm:text-sm dark:text-gray-200">
                  Abilities:
                </h3>
                <ul className="list-disc pl-3 text-xs sm:pl-4 sm:text-sm dark:text-gray-200">
                  {pokemon.abilities.map((ability) => (
                    <li
                      key={ability.ability.name}
                      className="list-inside capitalize"
                    >
                      {" "}
                      {ability.ability.name}
                      {ability.is_hidden && " (Hidden)"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
