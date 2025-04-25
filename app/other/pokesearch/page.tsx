"use client";

import { Pokemon, PokemonClient } from "pokenode-ts";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "components/pokemonCard";
import PokemonSearchSuggestions from "components/pokesearchSuggestions";

type PokemonName = string;

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function Page() {
  const api = new PokemonClient();
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

  const searchPokemon = async (query: PokemonName) => {
    try {
      setError("");
      // Get all Pokemon names for suggestions
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000",
      );
      const data = await response.json();
      const allPokemon = data.results.map((p: any) => p.name);

      // Filter suggestions based on query
      const matchedPokemon = allPokemon
        .filter((name: string) => name.includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(query ? matchedPokemon : []);

      // If exact match, get full Pokemon data
      if (allPokemon.includes(query.toLowerCase())) {
        const pokemonData = await api.getPokemonByName(query.toLowerCase());
        setPokemons([pokemonData]);
      } else if (query) {
        // Get multiple matching Pokemon
        const matchPromises: Promise<Pokemon>[] = matchedPokemon.map(
          (name: string) => api.getPokemonByName(name),
        );
        const results = await Promise.all(matchPromises);
        setPokemons(results);
      } else {
        setPokemons([]);
      }
    } catch (error) {
      setError("Pokemon not found");
      setPokemons([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => searchPokemon(query), 300),
    [],
  );

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearch(query);
      searchPokemon(query);
    } else {
      setPokemons([]);
      setSuggestions([]);
    }
  }, [searchParams]);

  return (
    <main className="p-8">
      <div className="mx-auto max-w-4xl z-[999]">
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
                inputRef={inputRef as any}
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
