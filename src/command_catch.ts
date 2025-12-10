import { State } from "./state";

export async function commandCatch(state: State, pokemonName: string) {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeApi.fetchPokemon(pokemonName);

    const roll = Math.random();
    const lowest = 40;
    const highest = 350;
    const catchChance = 1 - ((pokemon.base_experience - lowest) / (highest - lowest));

    if (roll < catchChance) {
        console.log(`${pokemon.name} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
};
