import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(50000);

  constructor() { }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
    const locations = this.cache.get<ShallowLocations>(url);

    if (locations) {
      return locations;
    }

    const response = await fetch(url);
    const data = await response.json() as ShallowLocations;

    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}/`;
    const location = this.cache.get<Location>(url);

    if (location) {
      return location;
    }

    const response = await fetch(url);
    const data = await response.json() as Location;

    this.cache.add(url, data);

    return data;
  }
}

export type ShallowLocations = {
  count: number
  next: string
  previous: any
  results: ShallowLocation[]
}

type ShallowLocation = {
  name: string
  url: string
}

export type Location = {
  id: number
  location: ShallowLocation
  name: string
  pokemon_encounters: PokemonEncounter[]
}

interface PokemonEncounter {
  pokemon: Pokemon
}

interface Pokemon {
  name: string
  url: string
}
