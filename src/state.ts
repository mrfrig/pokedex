
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { PokeAPI } from "./pokeapi.js";
import { commandExplore } from "./command_explore.js";

  export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
  };

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the names of 20 location areas, each subsequent call displays the next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations areas",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Lists all the Pokémon in a given area",
      callback: commandExplore,
    },
  };
}

export function initState(): State {
  const replInterface = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    });

  return {
    rl: replInterface,
    commands: getCommands(),
    pokeApi: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
};
