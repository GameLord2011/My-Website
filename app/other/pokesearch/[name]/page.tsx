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

    const toggleUnits: () => void = () => {
        setUseMetric((prev) => !prev);
    };

    // My brother suggested this Joke, Vivillon is #666 in the pokédex, so blood red seems appropriate.
    const isVivillon: boolean = pokemon?.name?.toLowerCase() === "vivillon";

    // Unwrap the params Promise
    useEffect(() => {
        paramsPromise
            .then((resolvedParams) => setParams(resolvedParams))
            .catch((err) => setError(`Failed to load params: ${err}`));
    }, [paramsPromise]);

    // Fetch Pokémon data when params are available
    useEffect(() => {
        if (!params) return;

        (async () => {
            try {
                const api = new PokemonClient();
                const data = await api.getPokemonByName(params.name);
                setPokemon(data);
            } catch (error) {
                setError(`Pokemon not found: ${error}`);
            }
        })();
    }, [params]);

    const playCry: () => void = () => {
        if (pokemon) {
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
        }
    };

    if (error) return <div className="p-8 text-red-500">{error}</div>;
    if (!params || !pokemon) return <div className="p-8">Loading...</div>;

    return (
        <main className="p-2 sm:p-4 md:p-6">
            <div
                className={
                    isVivillon
                        ? "mx-auto max-w-full bg-red-900 sm:max-w-2xl md:max-w-4xl"
                        : "mx-auto max-w-full sm:max-w-2xl md:max-w-4xl"
                }
            >
                <div
                    className={
                        isVivillon
                            ? "rounded-lg border-2 border-red-900 bg-red-900 p-2 shadow-lg sm:p-4 md:p-6"
                            : "rounded-lg bg-white/80 p-2 shadow-lg sm:p-4 md:p-6 dark:bg-gray-800/80"
                    }
                >
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
                                className={
                                    isVivillon
                                        ? "h-24 w-24 border-4 border-red-800 sm:h-36 sm:w-36 md:h-40 md:w-40"
                                        : "h-24 w-24 sm:h-36 sm:w-36 md:h-40 md:w-40"
                                }
                                priority={true}
                                placeholder="empty"
                                aria-hidden="false"
                            />
                            <button
                                type="button"
                                onClick={() => setIsShiny(!isShiny)}
                                className={
                                    isVivillon
                                        ? "absolute right-0 bottom-0 rounded-full border border-red-900 bg-red-800 p-1 transition-colors hover:bg-red-700 sm:p-2"
                                        : "absolute right-0 bottom-0 rounded-full bg-indigo-100 p-1 transition-colors hover:bg-indigo-200 sm:p-2 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                                }
                                title={`Switch to ${isShiny ? "normal" : "shiny"} form`}
                                aria-label={`Switch to ${isShiny ? "normal" : "shiny"} form`}
                            >
                                ✨
                            </button>
                        </div>
                        <div className="mt-2 sm:mt-4 sm:ml-4">
                            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                                <h1
                                    className={
                                        isVivillon
                                            ? "text-xl font-bold text-red-100 capitalize sm:text-2xl md:text-3xl"
                                            : "text-xl font-bold capitalize sm:text-2xl md:text-3xl dark:text-white"
                                    }
                                >
                                    {pokemon.name}
                                </h1>
                                <button
                                    type="button"
                                    onClick={playCry}
                                    className={
                                        isVivillon
                                            ? "rounded-full border border-red-900 bg-red-800 p-1 transition-colors hover:bg-red-700 sm:p-2"
                                            : "rounded-full bg-indigo-100 p-1 transition-colors hover:bg-indigo-200 sm:p-2 dark:bg-indigo-900 dark:hover:bg-indigo-800"
                                    }
                                    title="Play cry"
                                    aria-label="Play cry"
                                >
                                    🔊
                                </button>
                            </div>
                            <div className="mt-1 flex flex-wrap justify-center gap-1 sm:mt-2 sm:justify-start sm:gap-2">
                                {pokemon.types.map((type) => (
                                    <span
                                        key={type.type.name}
                                        className={
                                            isVivillon
                                                ? "rounded-full border border-red-900 bg-red-800 px-1 py-0.5 text-xs text-red-100 sm:px-2 sm:py-1 sm:text-sm"
                                                : `rounded-full px-1 py-0.5 text-xs sm:px-2 sm:py-1 sm:text-sm ${typeColors[type.type.name] || "bg-gray-200 text-gray-800"}`
                                        }
                                        aria-label={`Type: ${type.type.name}`}
                                    >
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                        <div>
                            <h2
                                className={
                                    isVivillon
                                        ? "mb-1 text-base font-semibold text-red-100 sm:mb-2 sm:text-lg"
                                        : "mb-1 text-base font-semibold sm:mb-2 sm:text-lg dark:text-white"
                                }
                            >
                                Base Stats
                            </h2>
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name} className="mb-1">
                                    <div
                                        className={
                                            isVivillon
                                                ? "flex justify-between text-red-100"
                                                : "flex justify-between dark:text-gray-200"
                                        }
                                    >
                                        <span className="text-xs capitalize sm:text-sm">
                                            {stat.stat.name}
                                        </span>
                                        <span className="text-xs sm:text-sm">
                                            {stat.base_stat}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            isVivillon
                                                ? "h-1 w-full rounded-full bg-red-800"
                                                : "h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700"
                                        }
                                    >
                                        <style jsx>{`
                                            .width-${stat.stat.name} {
                                                width: ${(stat.base_stat /
                                                    255) *
                                                100}%;
                                            }
                                        `}</style>
                                        <div
                                            className={
                                                isVivillon
                                                    ? `h-1 rounded-full bg-red-600 width-${stat.stat.name}`
                                                    : `h-1 rounded-full bg-indigo-600 dark:bg-indigo-400 width-${stat.stat.name}`
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2
                                className={
                                    isVivillon
                                        ? "mb-1 text-base font-semibold text-red-100 sm:mb-2 sm:text-lg"
                                        : "mb-1 text-base font-semibold sm:mb-2 sm:text-lg dark:text-white"
                                }
                            >
                                Details
                            </h2>
                            <div className="mb-2 flex items-center justify-center">
                                <span
                                    className={
                                        isVivillon
                                            ? "mr-1 text-xs text-red-100 sm:text-sm"
                                            : "mr-1 text-xs text-gray-700 sm:text-sm dark:text-gray-200"
                                    }
                                >
                                    m
                                </span>
                                <label
                                    className={
                                        isVivillon
                                            ? "relative inline-flex cursor-pointer content-center items-center self-center"
                                            : "relative inline-flex cursor-pointer content-center items-center self-center"
                                    }
                                >
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
                                    <div
                                        className={
                                            isVivillon
                                                ? "peer h-4 w-8 rounded-full bg-red-800 peer-checked:bg-red-600 peer-focus:ring-4 peer-focus:ring-red-400 peer-focus:outline-none after:absolute after:top-0.5 after:left-0 after:h-3 after:w-3 after:rounded-full after:border after:border-red-900 after:bg-red-100 after:transition-all after:content-[''] peer-checked:after:translate-x-[1.25rem] peer-checked:after:border-white sm:h-5 sm:w-10 sm:after:h-4 sm:after:w-4 sm:peer-checked:after:translate-x-[1.5rem] dark:border-red-900 dark:bg-red-900 dark:peer-focus:ring-red-800"
                                                : "peer h-4 w-8 rounded-full bg-gray-200 peer-checked:bg-indigo-600 peer-focus:ring-4 peer-focus:ring-indigo-300 peer-focus:outline-none after:absolute after:top-0.5 after:left-0 after:h-4 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-[1.25rem] peer-checked:after:border-white sm:h-5 sm:w-10 sm:after:h-4 sm:after:w-4 sm:peer-checked:after:translate-x-[1.5rem] dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-indigo-800"
                                        }
                                    ></div>
                                </label>
                                <span
                                    className={
                                        isVivillon
                                            ? "ml-1 text-xs text-red-100 sm:text-sm"
                                            : "ml-1 text-xs text-gray-700 sm:text-sm dark:text-gray-200"
                                    }
                                >
                                    i
                                </span>
                            </div>
                            <p
                                className={
                                    isVivillon
                                        ? "text-xs text-red-100 sm:text-sm"
                                        : "text-xs sm:text-sm dark:text-gray-200"
                                }
                            >
                                Height:{" "}
                                {useMetric
                                    ? `${pokemon.height / 10} m`
                                    : `${(pokemon.height / 10) * 3.281} ft`}
                            </p>
                            <p
                                className={
                                    isVivillon
                                        ? "text-xs text-red-100 sm:text-sm"
                                        : "text-xs sm:text-sm dark:text-gray-200"
                                }
                            >
                                Weight:{" "}
                                {useMetric
                                    ? `${pokemon.weight / 10} kg`
                                    : `${(pokemon.weight / 10) * 2.205} lbs`}
                            </p>
                            <div className="mt-2">
                                <h3
                                    className={
                                        isVivillon
                                            ? "mb-1 text-xs font-medium text-red-100 sm:text-sm"
                                            : "mb-1 text-xs font-medium sm:text-sm dark:text-gray-200"
                                    }
                                >
                                    Abilities:
                                </h3>
                                <ul
                                    className={
                                        isVivillon
                                            ? "list-disc pl-3 text-xs text-red-100 sm:pl-4 sm:text-sm"
                                            : "list-disc pl-3 text-xs sm:pl-4 sm:text-sm dark:text-gray-200"
                                    }
                                >
                                    {pokemon.abilities.map((ability) => (
                                        <li
                                            key={ability.ability.name}
                                            className={
                                                isVivillon
                                                    ? "list-inside text-red-100 capitalize"
                                                    : "list-inside capitalize"
                                            }
                                        >
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
