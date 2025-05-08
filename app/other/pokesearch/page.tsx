"use client";

import { Pokemon } from "pokenode-ts";
import { PokemonClient } from "pokenode-ts";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import PokemonCard from "components/pokemonCard";
import PokemonSearchSuggestions from "components/pokesearchSuggestions";

type PokemonName = string;

interface PokemonResult {
  name: string;
  url: string;
}

function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
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
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionSelect = (name: string) => {
    setSearch(name);
    searchPokemon(name);
    setSuggestions([]);
    setFocused(false);
  };

  const searchPokemon = useCallback(
    async (query: PokemonName) => {
      try {
        setError("");
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000",
        );
        const data = await response.json();
        const allPokemon = data.results.map((p: PokemonResult) => p.name);

        const matchedPokemon = allPokemon
          .filter((name: string) => name.includes(query.toLowerCase()))
          .slice(0, 5);
        setSuggestions(query ? matchedPokemon : []);

        if (allPokemon.includes(query.toLowerCase())) {
          const pokemonData = await api.getPokemonByName(query.toLowerCase());
          setPokemons([pokemonData]);
        } else if (query) {
          const matchPromises: Promise<Pokemon>[] = matchedPokemon.map(
            (name: string) => api.getPokemonByName(name),
          );
          const results = await Promise.all(matchPromises);
          setPokemons(results);
        } else {
          setPokemons([]);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Pokemon not found: ${errorMessage}`);
        setPokemons([]);
      }
    },
    [api, setError, setPokemons, setSuggestions],
  );

  const debouncedSearch = useMemo(
    () => debounce((query: string) => searchPokemon(query), 300),
    [searchPokemon],
  );

  useEffect(() => {
    const query = searchParams.get("q");
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
