"use client";

import { Pokemon, PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function PokemonPage({
  params: paramsPromise,
}: {
  params: Promise<{ name: string }>;
}) {
  const [params, setParams] = useState<{ name: string } | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [error, setError] = useState("");

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
        pokemon.name.toLowerCase() === "type-null"
          ? "https://play.pokemonshowdown.com/audio/cries/typenull.mp3"
          : `https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`
      );
      audio.play();
    }
  };

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!params || !pokemon) return <div className="p-8">Loading...</div>;

  return (
    <main className="p-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
          <div className="mb-6 flex items-center">
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
                width={200}
                height={200}
                className="h-50 w-50"
                priority={false}
              />
              <button
                onClick={() => setIsShiny(!isShiny)}
                className="absolute right-0 bottom-0 rounded-full bg-indigo-100 p-2 transition-colors hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                title={`Switch to ${isShiny ? "normal" : "shiny"} form`}
              >
                ✨
              </button>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold capitalize dark:text-white">
                  {pokemon.name}
                </h1>
                <button
                  onClick={playCry}
                  className="rounded-full bg-indigo-100 p-2 transition-colors hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                  title="Play cry"
                >
                  🔊
                </button>
              </div>
              <div className="mt-2 flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="rounded-full bg-teal-100 px-3 py-1 text-sm text-teal-900 dark:bg-teal-900 dark:text-teal-100"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="mb-3 text-xl font-semibold dark:text-white">
                Base Stats
              </h2>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="mb-2">
                  <div className="flex justify-between dark:text-gray-200">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <style jsx>{`
                      .width-${stat.stat.name} {
                        width: ${(stat.base_stat / 255) * 100}%;
                      }
                    `}</style>
                    <div
                      className={`h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 width-${stat.stat.name}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="mb-3 text-xl font-semibold dark:text-white">
                Details
              </h2>
              <p className="dark:text-gray-200">
                Height: {pokemon.height / 10}m
              </p>
              <p className="dark:text-gray-200">
                Weight: {pokemon.weight / 10}kg
              </p>
              <div className="mt-4">
                <h3 className="mb-2 font-medium dark:text-gray-200">
                  Abilities:
                </h3>
                <ul className="list-disc pl-5 dark:text-gray-200">
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
