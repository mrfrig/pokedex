import { State } from "./state";

export async function commandExplore(state: State, name: string) {
  if (!name) { throw new Error("Please provide a location name"); }
  const response = await state.pokeApi.fetchLocation(name);
  console.log(`Exploring ${name}...`);
  console.log("Found Pokemon:");
  for (const pokemonEncounters of response.pokemon_encounters) {
    console.log(` - ${pokemonEncounters.pokemon.name}`);
  }
};
