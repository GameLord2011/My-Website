// Pokemon API result for a single Pokémon
export interface PokemonResult {
  name: string;
  url: string;
}

// Pokemon API list response
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

// Props for the Pokémon search suggestions component
export interface PokemonSearchSuggestionsProps {
  suggestions: string[];
  visible: boolean;
  onSelect: (name: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

// GitHub repo type for repos page
export interface GitHubRepo {
  name: string;
  description: string | null;
  id: number;
  fork: boolean;
}

// Emoji map type for GitHub emojis
export interface EmojiMap {
  [key: string]: string;
}

export interface ghRepoData {
  avatar_url?: string;
  login?: string;
  name?: string;
  full_name?: string;
  stargazers_count?: string | number;
  description?: string;
  followers?: string | number;
}

// ...add more as needed from the codebase...
