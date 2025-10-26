"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PokemonClient } from "pokenode-ts";
import { Pokemon } from "pokenode-ts";
import { PokemonResult } from "components/complexTypes";
import { PokemonListResponse } from "components/complexTypes";

const PokemonCard = dynamic(() => import("components/pokemonCard"), {
    loading: () => <span className="yellow-500">Loading...</span>,
    ssr: false,
});

const PokemonSearchSuggestions = dynamic(
    () => import("components/pokesearchSuggestions"),
    {
        loading: () => <span>Loading...</span>,
        ssr: false,
    },
);

type PokemonName = string;

export default function Page() {
    const api = useMemo(() => new PokemonClient(), []);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState<PokemonName>(
        searchParams.get("q") || "",
    );
    const [suggestions, setSuggestions] = useState<PokemonName[]>([]);
    const [error, setError] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    //const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const searchPokemon = useCallback(
        async (query: PokemonName) => {
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=1000",
                );
                const data: PokemonListResponse = await response.json();
                const allPokemon = data.results.map(
                    (pkmn: PokemonResult) => pkmn.name,
                );

                const matchedPokemon = allPokemon
                    .filter((name) => name.includes(query.toLowerCase()))
                    .slice(0, 5);

                const suggestions = query ? matchedPokemon : [];

                let pokemons: Pokemon[] = [];

                if (allPokemon.includes(query.toLowerCase())) {
                    const pokemonData = await api.getPokemonByName(
                        query.toLowerCase(),
                    );
                    pokemons = [pokemonData];
                } else if (query) {
                    const results = await Promise.all(
                        matchedPokemon.map((name) =>
                            api.getPokemonByName(name),
                        ),
                    );
                    pokemons = results;
                }

                return { pokemons, suggestions, error: "" };
            } catch (err: unknown) {
                const errorMessage =
                    err instanceof Error ? err.message : String(err);
                return {
                    pokemons: [],
                    suggestions: [],
                    error: `Pokemon not found: ${errorMessage}`,
                };
            }
        },
        [api],
    );

    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedSearch = useCallback(
        (query: string) => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(async () => {
                const result = await searchPokemon(query);
                startTransition(() => {
                    setPokemons(result.pokemons);
                    setSuggestions(result.suggestions);
                    setError(result.error);
                });
            }, 300);
        },
        [searchPokemon],
    );

    useEffect(() => {
        const query = searchParams.get("q");
        if (query) {
            queueMicrotask(async () => {
                const result = await searchPokemon(query);
                startTransition(() => {
                    setPokemons(result.pokemons);
                    setSuggestions(result.suggestions);
                    setError(result.error);
                });
            });
        } else {
            startTransition(() => {
                setPokemons([]);
                setSuggestions([]);
            });
        }
    }, [searchParams, searchPokemon]);

    const handleSuggestionSelect = (name: string): void => {
        setSearch(name);
        searchPokemon(name);
        setSuggestions([]);
        setFocused(false);
    };

    return (
        <main className="p-8">
            <div className="z-999 mx-auto max-w-4xl">
                <div className="relative rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                    <h1 className="mb-6 text-center text-3xl font-bold dark:text-white">
                        Pokémon Search
                    </h1>
                    <div className="relative mb-8 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    if (value) debouncedSearch(value);
                                    router.push(
                                        `/other/pokesearch?q=${encodeURIComponent(value)}`,
                                    );
                                    setFocused(true);
                                }}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder="Enter Pokémon name..."
                                className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400"
                            />
                            <PokemonSearchSuggestions
                                suggestions={suggestions}
                                visible={focused}
                                onSelect={handleSuggestionSelect}
                                inputRef={
                                    inputRef as React.RefObject<HTMLInputElement>
                                }
                            />
                        </div>
                    </div>
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>
                <br />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pokemons.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            </div>
        </main>
    );
}
