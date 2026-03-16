/**
 * Tipos e interfaces para las pruebas de Pokémon
 * Organizados según el orden de aparición en el flujo de la API
 */

// ============================================================================
// 1. Respuesta de la lista de Pokémon 
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
// 2. Detalles de un Pokémon 
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
// 3. Detalles de la especie 
// ============================================================================

export interface SpeciesResponse {
  name: string;
  evolution_chain: {
    url: string;
  };
}

// ============================================================================
// 4. Cadena de evoluciones 
// ============================================================================

export interface EvolutionChainResponse {
  chain: EvolutionChain;
}

export interface EvolutionChain {
  species: { name: string };
  evolves_to: EvolutionChain[];
}
