import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import {
  findPokemonByName,
  getPokemonSpeciesUrl,
  getEvolutionChainUrl,
  getEvolutionChainData,
  getPokemonDetails,
  extractEvolutionNames,
  bubbleSort,
  printPokemonData,
} from './helpers';
import type { Pokemon } from './types';

// Cargar configuración desde config.json
const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

/**
 * Prueba de Integración: Obtener y ordenar evoluciones de Pokémon
 * El Pokémon a probar se configura en el archivo config.json
 */

test(`Obtener y ordenar evoluciones de ${config.pokemon}`, async ({ request }) => {
  // Pokémon a buscar desde config.json
  const pokemonName = config.pokemon;
  
  console.log(`\n🔍 Pokémon seleccionado: ${pokemonName.toUpperCase()}`);
  
  // Paso 1: Buscar el Pokémon en la lista
  const pokemonUrl = await findPokemonByName(request, pokemonName);

  // Paso 2: Obtener la URL de la especie del Pokémon
  const speciesUrl = await getPokemonSpeciesUrl(request, pokemonUrl);

  // Paso 3: Obtener la URL de la cadena de evoluciones
  const evolutionChainUrl = await getEvolutionChainUrl(request, speciesUrl);

  // Paso 4: Obtener los datos de la cadena de evoluciones
  const evolutionData = await getEvolutionChainData(request, evolutionChainUrl);

  // Paso 5: Extraer los nombres de los Pokémon en la cadena de evoluciones
  const evolutionNames = extractEvolutionNames(evolutionData.chain);

  // Paso 6: Obtener los datos completos (nombre y peso) de cada Pokémon
  const pokemonData: Pokemon[] = [];
  for (const name of evolutionNames) {
    const details = await getPokemonDetails(request, name);
    pokemonData.push(details);
  }

  // Paso 7: Ordenar alfabéticamente sin usar métodos nativos
  const sortedPokemonData = bubbleSort(pokemonData);

  // Paso 8: Imprimir los resultados
  printPokemonData(sortedPokemonData);

  // Verificaciones dinámicas
  expect(sortedPokemonData.length).toBeGreaterThan(0);
  
  // Verificar que los datos están ordenados alfabéticamente
  for (let i = 0; i < sortedPokemonData.length - 1; i++) {
    expect(sortedPokemonData[i].name <= sortedPokemonData[i + 1].name).toBeTruthy();
  }
});