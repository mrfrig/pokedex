import readline from "readline";
import type { CLICommand } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function cleanInput(input: string): string[] {
  const trimmed = input.trim();
  if (trimmed.length > 0) {
    return trimmed
      .split(/\s+/)
      .map((word) => word.toLowerCase());
  }
  return [];
}

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
  };
}

export function startREPL() {
  const replInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  replInterface.prompt();
  replInterface.on("line", (line) => { 
    const commands = cleanInput(line);
    if (commands.length > 0) {
      const command = commands[0];
      const availableCommands = getCommands();
      if (command in availableCommands) {
        availableCommands[command].callback(availableCommands);
      } else {
        console.log(`Unknown command`);
      }
    }
    
    replInterface.prompt();
  });
}