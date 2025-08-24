"use client";

import dynamic from "next/dynamic";

import { Pokemon } from "pokenode-ts";
import { PokemonClient } from "pokenode-ts";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { PokemonResult, PokemonListResponse } from "components/complexTypes";

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

function debounce<StringArgsFunction extends (...args: string[]) => void>(
  func: StringArgsFunction,
  delay: number,
): (...args: Parameters<StringArgsFunction>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<StringArgsFunction>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default function Page() {
  const api = useMemo(() => new PokemonClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<PokemonName>(
    searchParams.get("q") || "",
  );
  const [suggestions, setSuggestions] = useState<PokemonName[]>([]);
  const [error, setError] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionSelect = (name: string): void => {
    setSearch(name);
    searchPokemon(name);
    setSuggestions([]);
    setFocused(false);
  };

  const searchPokemon = useCallback(
    async (query: PokemonName): Promise<void> => {
      try {
        setError("");
        const response: Response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000",
        );
        const data: PokemonListResponse = await response.json();
        const allPokemon: string[] = data.results.map(
          (pkmn: PokemonResult) => pkmn.name,
        );

        const matchedPokemon = allPokemon
          .filter((name: string) => name.includes(query.toLowerCase()))
          .slice(0, 5);
        setSuggestions(query ? matchedPokemon : []);

        if (allPokemon.includes(query.toLowerCase())) {
          const pokemonData: Pokemon = await api.getPokemonByName(
            query.toLowerCase(),
          );
          setPokemons([pokemonData]);
        } else if (query) {
          const matchPromises: Promise<Pokemon>[] = matchedPokemon.map(
            (name: string) => api.getPokemonByName(name),
          );
          const results: Pokemon[] = await Promise.all(matchPromises);
          setPokemons(results);
        } else {
          setPokemons([]);
        }
      } catch (err: unknown) {
        const errorMessage: string =
          err instanceof Error ? err.message : String(err);
        setError(`Pokemon not found: ${errorMessage}`);
        setPokemons([]);
      }
    },
    [api, setError, setPokemons, setSuggestions],
  );

  const debouncedSearch = useMemo<(...args: string[]) => void>(
    () => debounce((query: string) => searchPokemon(query), 300),
    [searchPokemon],
  );

  useEffect(() => {
    const query: string | null = searchParams.get("q");
    if (query) {
      searchPokemon(query);
    } else {
      setPokemons([]);
      setSuggestions([]);
    }
  }, [searchParams, searchPokemon]);

  return (
    <main className="p-8">
      <div className="z-[999] mx-auto max-w-4xl">
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
                  setSearch(e.target.value);
                  if (e.target.value) debouncedSearch(e.target.value);
                  router.push(
                    `/other/pokesearch?q=${encodeURIComponent(e.target.value)}`,
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
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
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
