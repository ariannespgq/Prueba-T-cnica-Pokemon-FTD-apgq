import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: 'pokemon.spec.ts', // Solo ejecuta pokemon.spec.ts por defecto
  timeout: 30000,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});