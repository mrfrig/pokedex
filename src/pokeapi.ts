import {Cache} from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(50000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL? pageURL : `${PokeAPI.baseURL}/location-area/`;
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