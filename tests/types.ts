/**
 * Tipos e interfaces para las pruebas de Pokémon
 * Organizados según el orden de aparición en el flujo de la API
 */

// ============================================================================
// 1. Respuesta de la lista de Pokémon (https://pokeapi.co/api/v2/pokemon/)
// ============================================================================

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonEntry[];
}

export interface PokemonEntry {
  name: string;
  url: string;
}

// ============================================================================
// 2. Detalles de un Pokémon (https://pokeapi.co/api/v2/pokemon/{id}/)
// ============================================================================

export interface PokemonDetailsResponse {
  name: string;
  weight: number;
  species: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  name: string;
  weight: number;
}

// ============================================================================
// 3. Detalles de la especie (https://pokeapi.co/api/v2/pokemon-species/{id}/)
// ============================================================================

export interface SpeciesResponse {
  name: string;
  evolution_chain: {
    url: string;
  };
}

// ============================================================================
// 4. Cadena de evoluciones (https://pokeapi.co/api/v2/evolution-chain/{id}/)
// ============================================================================

export interface EvolutionChainResponse {
  chain: EvolutionChain;
}

export interface EvolutionChain {
  species: { name: string };
  evolves_to: EvolutionChain[];
}
