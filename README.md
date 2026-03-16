# Prueba Técnica - Automatización de Pruebas con Playwright

Pruebas de integración automatizadas para la API de PokéApi. Obtiene la cadena de evoluciones de un Pokémon, extrae los nombres y pesos, y los ordena alfabéticamente sin usar métodos nativos de JavaScript.

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/ariannespgq/Prueba-T-cnica-Pokemon-FTD-apgq.git
   cd Prueba-T-cnica-Pokemon-FTD-apgq
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright**
   ```bash
   npx playwright install
   ```

4. **Configurar variables de entorno (opcional)**
   
   Si deseas cambiar la URL base de la API, copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Y edita los valores según necesites.

## ▶️ Ejecución

```bash
npx playwright test
```

**Resultado esperado:**
```
🔍 Pokémon seleccionado: SQUIRTLE

=== Pokémon ordenados alfabéticamente con su peso ===
Nombre: Blastoise, Peso: 855
Nombre: Squirtle, Peso: 90
Nombre: Wartortle, Peso: 225
====================================================

✓ 1 passed (1.6s)
```

## 🎯 Cambiar el Pokémon

Para probar con un Pokémon diferente, edita el archivo `config.json`:

```json
{
  "pokemon": "charmander"
}
```

Luego ejecuta de nuevo:
```bash
npx playwright test
```

**Pokémon disponibles:** bulbasaur, charmander, squirtle, caterpie, weedle, pidgey, rattata, entre otros de los primeros 20 de la API.

## 📁 Estructura del Proyecto

```
tests/
├── helpers.ts             # Todas las funciones helper consolidadas
├── types.ts               # Todas las interfaces TypeScript
└── pokemon.spec.ts        # Prueba principal

config.json                # Configuración del Pokémon a probar
.env                       # Variables de entorno (URLs de la API)
playwright.config.ts       # Configuración de Playwright
```

## ✅ Criterios de Aceptación

- ✅ Todas las APIs responden con código 200
- ✅ Extrae correctamente los nombres de la cadena de evolución
- ✅ Ordena alfabéticamente sin usar `.sort()` (implementa Bubble Sort)
- ✅ Imprime los nombres ordenados con su peso

## 👤 Autor

**Arianne Perret Gentil**
- GitHub: [@ariannespgq](https://github.com/ariannespgq)
