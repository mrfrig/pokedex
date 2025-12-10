import { State } from "./state";

export async function commandPokedex(state: State) {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("You haven't caught any pokemon");
    }
    console.log("Your Pokedex:");
    for (const name in state.pokedex) {
        if (!Object.hasOwn(state.pokedex, name)) continue;
        console.log(` - ${name}`);
    }
};
