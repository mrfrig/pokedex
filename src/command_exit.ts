import { State } from "./state";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.pokeApi.cache.stopReapLoop();
  state.rl.close();
  process.exit(0);
};