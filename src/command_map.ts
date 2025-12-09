import { State } from "./state";

export async function commandMap(state: State) {
  const response = await state.pokeApi.fetchLocations(state.nextLocationsURL);
  for (const location of response.results) {
    console.log(location.name);
  }
  state.nextLocationsURL = response.next ?? "";
  state.prevLocationsURL = response.previous ?? "";
};

export async function commandMapB(state: State) {
  if (!state.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }
  
  const response = await state.pokeApi.fetchLocations(state.prevLocationsURL);
  for (const location of response.results) {
    console.log(location.name);
  }
  state.nextLocationsURL = response.next ?? "";
  state.prevLocationsURL = response.previous ?? "";
};

