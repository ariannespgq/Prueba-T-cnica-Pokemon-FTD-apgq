import type { APIRequestContext } from '@playwright/test';
import { expect } from '@playwright/test';
import type {
  PokemonListResponse,
  PokemonDetailsResponse,
  SpeciesResponse,
  EvolutionChainResponse,
  EvolutionChain,
  Pokemon
} from './types';

/**
 * Helpers consolidados para las pruebas de Pokémon
 */

// ============================================================================
// API HELPERS - Funciones para interactuar con la PokéAPI
// ============================================================================

const BASE_URL = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';

/**
 * Busca un Pokémon por nombre en la lista de la API
 */
export async function findPokemonByName(
  request: APIRequestContext,
  pokemonName: string
): Promise<string> {
  const endpoint = process.env.POKEMON_LIST_ENDPOINT || '/pokemon/';
  const response = await request.get(`${BASE_URL}${endpoint}`);
  expect(response.status()).toBe(200);

  const data: PokemonListResponse = await response.json();
  const pokemonEntry = data.results.find((pokemon) => pokemon.name === pokemonName);

  if (!pokemonEntry) {
    throw new Error(`${pokemonName} no encontrado en la lista de Pokémon.`);
  }

  return pokemonEntry.url;
}

/**
 * Obtiene la URL de la especie de un Pokémon
 */
export async function getPokemonSpeciesUrl(
  request: APIRequestContext,
  pokemonUrl: string
): Promise<string> {
  const response = await request.get(pokemonUrl);
  expect(response.status()).toBe(200);

  const pokemonData: PokemonDetailsResponse = await response.json();
  return pokemonData.species.url;
}

/**
 * Obtiene la URL de la cadena de evoluciones
 */
export async function getEvolutionChainUrl(
  request: APIRequestContext,
  speciesUrl: string
): Promise<string> {
  const response = await request.get(speciesUrl);
  expect(response.status()).toBe(200);

  const speciesData: SpeciesResponse = await response.json();
  return speciesData.evolution_chain.url;
}

/**
 * Obtiene los datos completos de la cadena de evoluciones
 */
export async function getEvolutionChainData(
  request: APIRequestContext,
  evolutionChainUrl: string
): Promise<EvolutionChainResponse> {
  const response = await request.get(evolutionChainUrl);
  expect(response.status()).toBe(200);

  return await response.json();
}

/**
 * Obtiene los datos de un Pokémon específico (nombre y peso)
 */
export async function getPokemonDetails(
  request: APIRequestContext,
  pokemonName: string
): Promise<Pokemon> {
  const endpoint = process.env.POKEMON_DETAIL_ENDPOINT || '/pokemon';
  const response = await request.get(`${BASE_URL}${endpoint}/${pokemonName}`);
  expect(response.status()).toBe(200);

  const pokemonInfo: PokemonDetailsResponse = await response.json();
  return { name: pokemonInfo.name, weight: pokemonInfo.weight };
}

// ============================================================================
// EVOLUTION HELPERS - Funciones para procesar cadenas de evolución
// ============================================================================

/**
 * Extrae recursivamente los nombres de los Pokémon en la cadena de evoluciones
 */
export function extractEvolutionNames(chain: EvolutionChain, result: string[] = []): string[] {
  result.push(chain.species.name);
  if (chain.evolves_to.length > 0) {
    extractEvolutionNames(chain.evolves_to[0], result);
  }
  return result;
}

// ============================================================================
// SORT HELPERS - Funciones de ordenamiento
// ============================================================================

/**
 * Ordena un array de Pokémon alfabéticamente por nombre usando Bubble Sort
 * (sin utilizar métodos de ordenamiento nativos como .sort())
 */
export function bubbleSort(arr: Pokemon[]): Pokemon[] {
  const sortedArr = [...arr];

  for (let i = 0; i < sortedArr.length; i++) {
    for (let j = 0; j < sortedArr.length - i - 1; j++) {
      if (sortedArr[j].name > sortedArr[j + 1].name) {
        const temp = sortedArr[j];
        sortedArr[j] = sortedArr[j + 1];
        sortedArr[j + 1] = temp;
      }
    }
  }

  return sortedArr;
}

// ============================================================================
// OUTPUT HELPERS - Funciones de formateo y salida
// ============================================================================

/**
 * Imprime los datos de los Pokémon ordenados con formato
 */
export function printPokemonData(pokemonData: Pokemon[]): void {
  console.log('\n=== Pokémon ordenados alfabéticamente con su peso ===');
  for (const { name, weight } of pokemonData) {
    console.log(`Nombre: ${name.charAt(0).toUpperCase() + name.slice(1)}, Peso: ${weight}`);
  }
  console.log('====================================================\n');
}
