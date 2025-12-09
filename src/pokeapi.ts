export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const response = await fetch(pageURL? pageURL : `${PokeAPI.baseURL}/location-area/`);
    return await response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}/`);
    return await response.json();
  }
}

export type ShallowLocations = {
  count: number
  next: string
  previous: any
  results: Result[]
}

type Result = {
  name: string
  url: string
}

export type Location = {
  id: number;
  name: string;
};